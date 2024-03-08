require("dotenv").config();
const constants = require("../constants/constants");
const categoryQuery = require("../lib/queries/categorymaster");
const productQuery = require("../lib/queries/product");
const response = require("../lib/response");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const db = require("../models");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

exports.fetchcategories = async (req, res) => {
  try {
    let list = await categoryQuery.getCategoryList();
    return response.sendResponse(
      constants.response_code.SUCCESS,
      null,
      list,
      res,
      null
    );
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/kaustubhbadve/Desktop/Ecommerse/Ecommerce/Server/src/upload"
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "." + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).array("images", 5);

exports.addProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, error: "Error uploading files" });
      }
      const body = req.body;
      const files = req.files;
      if (body?.highlight) {
        let val = body?.highlight?.split(",");
        body["highlight"] = val;
      }
      const ratings = Math.floor(Math.random() * (10000 - 1099 + 1)) + 1099;
      const reviews = Math.floor(Math.random() * (1000 - 467 + 1)) + 467;
      const productId = await productQuery.createProduct(body);
      const avgRating = Math.round((Math.random() * (5 - 2 + 1) + 2) * 10) / 10;
      body = {
        ...body,
        ratings,
        reviews,
        avgRating,
      };
      if (files && files.length > 0) {
        for (const file of files) {
          const { filename, mimetype, path } = file;
          const imgUrl = await s3UploadData(filename, mimetype, path);
          await productQuery.createImage({ productId: productId?.id, imgUrl });
        }
      }

      res.status(200).json({ success: true, productId });
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

async function s3UploadData(fileName, contentType, filePath) {
  try {
    const params = {
      Bucket: "firstbucketkb",
      Key: `/uploads/${fileName}`,
      Body: fs.createReadStream(filePath),
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);

    const fileUrl = `https://${
      params.Bucket
    }.s3.amazonaws.com/${encodeURIComponent(params.Key)}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

exports.fetchProductList = async (req, res) => {
  try {
    const { category,rating, searchTxt, brand, discount,priceMin,priceMax,pageSize, pageNo } = req.query;
    console.log("category", req.query);
    let data = await db.sequelize.query(
      `call fetchProducts(:product,:category,:rating,:brand,:discount,:priceMin,:priceMax,:pageNo,:pageSize)`,
      {
        replacements: {
          product: searchTxt || -1,
          category: category || -1,
          rating: rating || -1,
          brand: brand || -1,
          discount: discount || -1,
          priceMin:priceMin || 0,
          priceMax:priceMax || -1,
          pageNo: pageNo || 1,
          pageSize: pageSize || 8,
        },
      }
    );

    console.log("data from fetchProducts", data[0]);
    return response.sendResponse(
      constants.response_code.SUCCESS,
      null,
      data[0],
      res,
      null
    );
  } catch (error) {
    console.log(error);
  }
};

exports.fetchAllProductGroupwise = async (req, res) => {
  try {
    let data = await db.sequelize.query(`call fetchAllProductGroupwise()`, {
      replacements: {},
    });

    return response.sendResponse(
      constants.response_code.SUCCESS,
      null,
      data[0],
      res,
      null
    );
  } catch (error) {
    console.log(error);
  }
};

exports.fetchProductData = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await db.sequelize.query(`call fetchProduct(:id)`, {
      replacements: {
        id,
      },
    });

    return response.sendResponse(
      constants.response_code.SUCCESS,
      null,
      data[0],
      res,
      null
    );
  } catch (error) {
    console.log(error);
  }
};
