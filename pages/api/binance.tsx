import axios from "axios";

export default async function handler(req, res) {
  try {
    const data = await axios.get(
      "https://api.binance.com/sapi/v1/system/status"
    );
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}
