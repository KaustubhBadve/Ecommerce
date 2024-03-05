export async function getLocationData() {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    const { city, region, postal } = data;
    return { city, region, postal };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
}

export async function findCityAndRegionFromPincode(pincode) {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();
    if (data[0].Status === "Success") {
      const city = data[0].PostOffice[0].District;
      const region = data[0].PostOffice[0].State;
      return { city, region };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching city and region data:", error);
    return null;
  }
}
