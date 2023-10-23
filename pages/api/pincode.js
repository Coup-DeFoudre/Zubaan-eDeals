
export default function handler(req, res) {

  let pincodes = {
    "452011": [ "Indore", "Madhya Pradesh"],
    "452001": [ "Indore", "Madhya Pradesh"],
    "486331": ["Sidhi", "Madhya Pradesh"],
    "450001": ["Dhar", "Madhya Pradesh"],
    "486341": ["Sidhi", "Madhya Pradesh"]
  }
    res.status(200).json(pincodes)
  }