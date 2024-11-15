const FarmModel = require("../Models/FarmSchema");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.Ai_key);

exports.CreateFarm = async (req, res) => {
  const {
    Location,
    AreaSize,
    Season,
    SoilType,
    weatherCondition,
    Budget,
    Equipment,
    waterAvailability,
    AnnualRainfall,
  } = req.body;
  try {
    const farmData = {
      Location,
      AreaSize,
      Season,
      SoilType,
      weatherCondition,
      Budget,
      Equipment,
      waterAvailability,
      AnnualRainfall,
    };

    const response = await FarmModel.create(farmData);

    // Call the run function with the farmData
    try {
      await run(farmData);
    } catch (runError) {
      console.error("Error during AI generation:", runError);
    }
    res.status(200).json({ message: "Farm created successfully", response });
  } catch (error) {
    res.status(501).json({ message: "Problem Is occured", error });
  }
};

async function run(farmData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please recommend the best crop to grow, along with suitable fertilizer, pesticide, and seed options for maximum profit, given the following farm data: ${JSON.stringify(
      farmData
    )}. Consider AreaSize in acres. For fertilizer, provide Name, Quantity, and Application Method. For pesticide, provide Name, Quantity, and Application Method. For seeds, provide Name, Variety, and Quantity. For profit potential, give a reason as well. Give all data in JSON format without asterisks (*) or any special characters. Do not provide any explanations, important considerations, or disclaimers about consulting local agricultural experts.Ensure all data is given in JSON format under any condition. Do not include extra backticks in the starting, or the terms 'json' or 'backtick' , extra comma(,) in the response.There is one condition a user give same data Thousand Time u don;t chage your response.
  Every Time You Use This Pattern And This Key Value:
  {
    Crop: 'Data',
  Fertilizer: [
    {
      Name: 'Data',
      Quantity: 'Data',
      ApplicationMethod: 'Data'
    },
    { Name: 'Data', Quantity: 'Data', ApplicationMethod: 'Datat' }
  ],
  Pesticide: [
    {
      Name: 'Data',
      Quantity: 'Data',
      ApplicationMethod: 'Data'
    },
    {
      Name: 'Data',
      Quantity: 'Data',
      ApplicationMethod: 'Data'
    }
  ],
  Seeds: { Name: 'Data', Variety: 'Data', Quantity: 'Data' },
  ProfitPotential: 'Data'
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    let obj;
    try {
      obj = JSON.parse(text);
    } catch (e) {
      console.error(`Error parsing JSON: ${e}`);
      obj = null;
    }

    if (obj) {
      console.log(obj);
    } else {
      console.log(`Invalid JSON response: ${text}`);
    }
  } catch (error) {
    if (
      error instanceof GoogleGenerativeAIResponseError &&
      error.message.includes("SAFETY")
    ) {
      console.error("Response blocked due to safety concerns:", error);
      res
        .status(501)
        .json({ message: "Some Error Occured Refresh or Restart a website" });
      // Notify the user or take appropriate action
    } else {
      console.error("An error occurred:", error);
      res
        .status(501)
        .json({ message: "Some Error Occured Refresh or Restart a website" });
    }
  }
}
