// Task: Define English, Hindi, Kannada-compatibility, and Malayalam translations for the SoilCare website.

export type Language = "en" | "hi" | "kn" | "ml";

const baseTranslations = {
  en: {
    home: "Home",
    soilTest: "Soil Test",
    analyze: "Analyze",
    crops: "Find Suitable Crops",
    history: "History",
    profile: "Profile",

    smartSoilAnalysis: "Smart Soil Analysis",
    goodMorning: "Good morning",
    letsUnderstandSoil: "Let's understand your soil",
    aiSoilInsights: "Get AI-powered soil insights and crop recommendations.",
    analyzeYourSoil: "Analyze Your Soil",
    simpleSoilCropAdvice: "Get simple soil and crop advice.",
    startAnalysis: "Start Analysis",

    quickActions: "Quick Actions",
    chooseAnOption: "Choose an option",
    enterNpkValues: "Enter your NPK and soil values.",
    findCrops: "Find Crops",
    findSuitableCrops: "Find crops suitable for your soil.",
    open: "Open",
    check: "Check",

    soilHealth: "Soil Health",
    overallSoilHealth: "Overall Soil Health",
    viewResults: "View Results",
    noAnalysis: "No Analysis",
    basedOnLatestAnalysis: "Based on your latest soil analysis.",
    completeAnalysis: "Complete a soil analysis to see your soil health.",
    nutrientStatus: "Nutrient Status",
    latestCropRecommendation: "Latest Crop Recommendation",
    modelConfidence: "Model confidence",

    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    moisture: "Moisture",
    organicMatter: "Organic Matter",
    ph: "pH",

    good: "Good",
    moderate: "Moderate",
    needsImprovement: "Needs Improvement",
    review: "Review",
    low: "Low",
    noData: "No Data",

    analyzeSoil: "Analyze Soil",
    submit: "Submit",
    cancel: "Cancel",
    back: "Back",

    english: "English",
    hindi: "Hindi",
    kannada: "Kannada",
    language: "Language",

    // Task: Add English translations for the soil analysis page.
soilAnalysis: "Soil Analysis",
addSoilPhoto: "Add a Soil Photo",
soilPhotoDescription: "Take a photo of your soil or choose an image from your phone.",
takePhoto: "Take Photo",
useCamera: "Use your webcam or phone camera",
uploadPhoto: "Upload Photo",
chooseImage: "Choose an image from your device",
invalidImage: "Invalid image",
invalidImageFile: "Please select a valid image file.",
imageSizeError: "Image size must be less than 5 MB.",
cameraError: "Unable to access the camera. Please allow camera permission and try again.",
photoTips: "Photo tips",
goodLighting: "Take the photo in good lighting",
soilClearlyVisible: "Keep the soil clearly visible",
avoidBlurry: "Avoid blurry images",
maxImageSize: "Maximum image size: 5 MB",
takeAPhoto: "Take a Photo",
cameraPosition: "Position the soil inside the camera view.",
capturePhoto: "Click the camera button to capture",
soilPhoto: "Soil Photo",
checkPhoto: "Check your photo before continuing.",
retakePhoto: "Retake Photo",
chooseAnotherPhoto: "Choose Another Photo",
continue: "Continue",

// Task: Add English translations for the History page.
analysisHistory: "Analysis History",
previousSoilAnalyses: "Your previous soil analyses",
totalAnalyses: "Total Analyses",
recentAnalyses: "Recent Analyses",
noAnalysesYet: "No analyses yet",
completeSoilTestHistory: "Complete a soil test to see your analysis history here.",
startSoilTest: "Start Soil Test",
recommended: "recommended",
cropRecommendationUnavailable: "Crop recommendation unavailable",
score: "Score",
unknownDate: "Unknown date",

// Task: Add English translations for the Profile page.
profileTitle: "Profile",
accountPreferences: "Your account and preferences",
soilCareUser: "SoilCare User",
editProfile: "Edit Profile",
farmInformation: "Farm Information",
farmLocation: "Farm Location",
addVillageLocation: "Add your village or location",
languageSettings: "Language",
availableLanguages: "English • Hindi • Malayalam",
preferences: "Preferences",
voiceOutput: "Voice Output",
listenRecommendations: "Listen to soil recommendations",
notifications: "Notifications",
soilCropUpdates: "Soil and crop updates",
support: "Support",
helpSupport: "Help & Support",
getSoilCareHelp: "Get help using SoilCare",
appSettings: "App Settings",
managePreferences: "Manage your preferences",
logout: "Logout",
soilCareTagline: "SoilCare • AI-Powered Soil Analytics",

// Task: Add multilingual translations for the Soil Test page.


enterSoilParameters: "Enter your soil parameters",
enterSoilDetails: "Enter Soil Details",
soilTestReportDescription: "Enter the values from your soil test report.",

analysisFailed: "Analysis Failed",
unableToAnalyzeSoil: "Unable to analyze soil.",

enterNitrogen: "Enter N value",
enterPhosphorus: "Enter P value",
enterPotassium: "Enter K value",
examplePh: "Example: 6.5",
exampleMoisture: "Example: 60",
exampleOrganicMatter: "Example: 3.5",

pleaseEnterNitrogen: "Please enter Nitrogen value.",
nitrogenCannotBeNegative: "Nitrogen cannot be negative.",
pleaseEnterPhosphorus: "Please enter Phosphorus value.",
phosphorusCannotBeNegative: "Phosphorus cannot be negative.",
pleaseEnterPotassium: "Please enter Potassium value.",
potassiumCannotBeNegative: "Potassium cannot be negative.",
pleaseEnterSoilPh: "Please enter soil pH.",
phBetween: "pH must be between 0 and 14.",
pleaseEnterMoisture: "Please enter moisture value.",
moistureBetween: "Moisture must be between 0 and 100%.",
pleaseEnterOrganicMatter: "Please enter organic matter value.",
organicMatterBetween: "Organic matter must be between 0 and 100%.",

analyzingSoil: "Analyzing Soil...",


soilAnalysisComplete: "Soil Analysis Complete",
soilAnalyzedSuccessfully: "Your soil has been analyzed successfully.",

healthScore: "Health Score",
notAvailable: "Not available",

nutrientAnalysis: "Nutrient Analysis",

recommendedCrop: "Recommended Crop",

// Task: Add English translations for the Find Suitable Crops page.

findSuitableCropsTitle: "Find Suitable Crops",
findCropsForSoil: "Find crops suitable for your soil",
findRightCrop: "Find the Right Crop",
cropRecommendationDescription:
  "Enter your soil conditions to find a crop recommendation.",

recommendationFailed: "Recommendation Failed",
pleaseEnterAllSoilConditions:
  "Please enter all soil conditions.",
pleaseEnterValidNumbers:
  "Please enter valid numeric values.",
soilValuesCannotBeNegative:
  "Soil values cannot be negative.",
phMustBeBetween:
  "pH must be between 0 and 14.",
moistureMustBeBetween:
  "Moisture must be between 0 and 100%.",

enterNValue: "Enter N value",
enterPValue: "Enter P value",
enterKValue: "Enter K value",
examplePhValue: "Example: 6.5",
enterMoistureValue: "Enter moisture value",
enterRainfallValue: "Enter rainfall value",

soilConditions: "Soil Conditions",
rainfall: "Rainfall",

findingCrops: "Finding Crops...",
findSuitableCropsButton: "Find Suitable Crops",


highlySuitable: "Highly Suitable",
moderatelySuitable: "Moderately Suitable",
suitable: "Suitable",

unableToGetCropRecommendation:
  "Unable to get crop recommendation.",
invalidCropRecommendation:
  "Invalid crop recommendation received from server.",
unableToConnectCropServer:
  "Unable to connect to the crop recommendation server. Please make sure FastAPI is running.",


unableToConnectServer:
  "Unable to connect to the soil analysis server. Please make sure the FastAPI backend is running.",
  },

  hi: {
    home: "होम",
    soilTest: "मिट्टी परीक्षण",
    analyze: "विश्लेषण",
    crops: "उपयुक्त फसलें खोजें",
    history: "इतिहास",
    profile: "प्रोफ़ाइल",

    smartSoilAnalysis: "स्मार्ट मिट्टी विश्लेषण",
    goodMorning: "सुप्रभात",
    letsUnderstandSoil: "आइए आपकी मिट्टी को समझें",
    aiSoilInsights: "AI आधारित मिट्टी की जानकारी और फसल की सिफारिशें प्राप्त करें।",
    analyzeYourSoil: "अपनी मिट्टी का विश्लेषण करें",
    simpleSoilCropAdvice: "मिट्टी और फसल की सरल सलाह प्राप्त करें।",
    startAnalysis: "विश्लेषण शुरू करें",

    quickActions: "त्वरित कार्य",
    chooseAnOption: "एक विकल्प चुनें",
    enterNpkValues: "अपने NPK और मिट्टी के मान दर्ज करें।",
    findCrops: "फसलें खोजें",
    findSuitableCrops: "अपनी मिट्टी के लिए उपयुक्त फसलें खोजें।",
    open: "खोलें",
    check: "जाँचें",

    soilHealth: "मिट्टी का स्वास्थ्य",
    overallSoilHealth: "कुल मिट्टी का स्वास्थ्य",
    viewResults: "परिणाम देखें",
    noAnalysis: "कोई विश्लेषण नहीं",
    basedOnLatestAnalysis: "आपके नवीनतम मिट्टी विश्लेषण के आधार पर।",
    completeAnalysis: "मिट्टी का स्वास्थ्य देखने के लिए मिट्टी का विश्लेषण पूरा करें।",
    nutrientStatus: "पोषक तत्वों की स्थिति",
    latestCropRecommendation: "नवीनतम फसल सिफारिश",
    modelConfidence: "मॉडल का विश्वास स्तर",

    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटैशियम",
    moisture: "नमी",
    organicMatter: "कार्बनिक पदार्थ",
    ph: "pH",

    good: "अच्छा",
    moderate: "मध्यम",
    needsImprovement: "सुधार आवश्यक",
    review: "जाँच आवश्यक",
    low: "कम",
    noData: "कोई डेटा नहीं",

    analyzeSoil: "मिट्टी का विश्लेषण करें",
    submit: "जमा करें",
    cancel: "रद्द करें",
    back: "वापस",

    english: "अंग्रेज़ी",
    hindi: "हिन्दी",
    kannada: "कन्नड़",
    language: "भाषा",

    // Task: Add Hindi translations for the soil analysis page.
soilAnalysis: "मिट्टी का विश्लेषण",
addSoilPhoto: "मिट्टी की फोटो जोड़ें",
soilPhotoDescription: "अपनी मिट्टी की फोटो लें या अपने फोन से एक छवि चुनें।",
takePhoto: "फोटो लें",
useCamera: "अपने वेबकैम या फोन के कैमरे का उपयोग करें",
uploadPhoto: "फोटो अपलोड करें",
chooseImage: "अपने डिवाइस से एक छवि चुनें",
invalidImage: "अमान्य छवि",
invalidImageFile: "कृपया एक मान्य छवि फ़ाइल चुनें।",
imageSizeError: "छवि का आकार 5 MB से कम होना चाहिए।",
cameraError: "कैमरे तक पहुंच नहीं हो सकी। कृपया कैमरा अनुमति दें और फिर प्रयास करें।",
photoTips: "फोटो लेने के सुझाव",
goodLighting: "अच्छी रोशनी में फोटो लें",
soilClearlyVisible: "मिट्टी स्पष्ट रूप से दिखाई देनी चाहिए",
avoidBlurry: "धुंधली तस्वीरों से बचें",
maxImageSize: "अधिकतम छवि आकार: 5 MB",
takeAPhoto: "फोटो लें",
cameraPosition: "मिट्टी को कैमरे के दृश्य के अंदर रखें।",
capturePhoto: "फोटो लेने के लिए कैमरा बटन दबाएं",
soilPhoto: "मिट्टी की फोटो",
checkPhoto: "जारी रखने से पहले अपनी फोटो जांचें।",
retakePhoto: "फिर से फोटो लें",
chooseAnotherPhoto: "दूसरी फोटो चुनें",
continue: "जारी रखें",

// Task: Add Hindi translations for the History page.
analysisHistory: "विश्लेषण इतिहास",
previousSoilAnalyses: "आपके पिछले मिट्टी विश्लेषण",
totalAnalyses: "कुल विश्लेषण",
recentAnalyses: "हाल के विश्लेषण",
noAnalysesYet: "अभी तक कोई विश्लेषण नहीं",
completeSoilTestHistory: "अपना विश्लेषण इतिहास देखने के लिए मिट्टी परीक्षण पूरा करें।",
startSoilTest: "मिट्टी परीक्षण शुरू करें",
recommended: "की सिफारिश की गई",
cropRecommendationUnavailable: "फसल की सिफारिश उपलब्ध नहीं है",
score: "स्कोर",
unknownDate: "अज्ञात तारीख",

// Task: Add Hindi translations for the Profile page.
profileTitle: "प्रोफ़ाइल",
accountPreferences: "आपका खाता और प्राथमिकताएँ",
soilCareUser: "SoilCare उपयोगकर्ता",
editProfile: "प्रोफ़ाइल संपादित करें",
farmInformation: "खेत की जानकारी",
farmLocation: "खेत का स्थान",
addVillageLocation: "अपना गाँव या स्थान जोड़ें",
languageSettings: "भाषा",
availableLanguages: "अंग्रेज़ी • हिन्दी • मलयालम",
preferences: "प्राथमिकताएँ",
voiceOutput: "वॉइस आउटपुट",
listenRecommendations: "मिट्टी की सिफारिशें सुनें",
notifications: "सूचनाएँ",
soilCropUpdates: "मिट्टी और फसल अपडेट",
support: "सहायता",
helpSupport: "सहायता और समर्थन",
getSoilCareHelp: "SoilCare का उपयोग करने में सहायता प्राप्त करें",
appSettings: "ऐप सेटिंग्स",
managePreferences: "अपनी प्राथमिकताएँ प्रबंधित करें",
logout: "लॉगआउट",
soilCareTagline: "SoilCare • AI आधारित मिट्टी विश्लेषण",

// Task: Add Hindi translations for the Soil Test page.


enterSoilParameters: "अपने मिट्टी के पैरामीटर दर्ज करें",
enterSoilDetails: "मिट्टी का विवरण दर्ज करें",
soilTestReportDescription: "अपनी मिट्टी परीक्षण रिपोर्ट से मान दर्ज करें।",

analysisFailed: "विश्लेषण विफल",
unableToAnalyzeSoil: "मिट्टी का विश्लेषण नहीं किया जा सका।",

enterNitrogen: "N मान दर्ज करें",
enterPhosphorus: "P मान दर्ज करें",
enterPotassium: "K मान दर्ज करें",
examplePh: "उदाहरण: 6.5",
exampleMoisture: "उदाहरण: 60",
exampleOrganicMatter: "उदाहरण: 3.5",

pleaseEnterNitrogen: "कृपया नाइट्रोजन का मान दर्ज करें।",
nitrogenCannotBeNegative: "नाइट्रोजन ऋणात्मक नहीं हो सकता।",
pleaseEnterPhosphorus: "कृपया फॉस्फोरस का मान दर्ज करें।",
phosphorusCannotBeNegative: "फॉस्फोरस ऋणात्मक नहीं हो सकता।",
pleaseEnterPotassium: "कृपया पोटैशियम का मान दर्ज करें।",
potassiumCannotBeNegative: "पोटैशियम ऋणात्मक नहीं हो सकता।",
pleaseEnterSoilPh: "कृपया मिट्टी का pH दर्ज करें।",
phBetween: "pH 0 और 14 के बीच होना चाहिए।",
pleaseEnterMoisture: "कृपया नमी का मान दर्ज करें।",
moistureBetween: "नमी 0 से 100% के बीच होनी चाहिए।",
pleaseEnterOrganicMatter: "कृपया जैविक पदार्थ का मान दर्ज करें।",
organicMatterBetween: "जैविक पदार्थ 0 से 100% के बीच होना चाहिए।",

analyzingSoil: "मिट्टी का विश्लेषण हो रहा है...",


soilAnalysisComplete: "मिट्टी का विश्लेषण पूरा हुआ",
soilAnalyzedSuccessfully: "आपकी मिट्टी का सफलतापूर्वक विश्लेषण किया गया है।",

healthScore: "स्वास्थ्य स्कोर",
notAvailable: "उपलब्ध नहीं",

nutrientAnalysis: "पोषक तत्व विश्लेषण",


recommendedCrop: "अनुशंसित फसल",

// Task: Add Hindi translations for the Find Suitable Crops page.

findSuitableCropsTitle: "उपयुक्त फसलें खोजें",
findCropsForSoil: "अपनी मिट्टी के लिए उपयुक्त फसलें खोजें",
findRightCrop: "सही फसल खोजें",
cropRecommendationDescription:
  "फसल की सिफारिश प्राप्त करने के लिए अपनी मिट्टी की स्थिति दर्ज करें।",

recommendationFailed: "सिफारिश विफल",
pleaseEnterAllSoilConditions:
  "कृपया मिट्टी की सभी स्थितियाँ दर्ज करें।",
pleaseEnterValidNumbers:
  "कृपया मान्य संख्यात्मक मान दर्ज करें।",
soilValuesCannotBeNegative:
  "मिट्टी के मान ऋणात्मक नहीं हो सकते।",
phMustBeBetween:
  "pH 0 और 14 के बीच होना चाहिए।",
moistureMustBeBetween:
  "नमी 0 से 100% के बीच होनी चाहिए।",

enterNValue: "N मान दर्ज करें",
enterPValue: "P मान दर्ज करें",
enterKValue: "K मान दर्ज करें",
examplePhValue: "उदाहरण: 6.5",
enterMoistureValue: "नमी का मान दर्ज करें",
enterRainfallValue: "वर्षा का मान दर्ज करें",

soilConditions: "मिट्टी की स्थिति",
rainfall: "वर्षा",

findingCrops: "फसलें खोजी जा रही हैं...",
findSuitableCropsButton: "उपयुक्त फसलें खोजें",


highlySuitable: "अत्यधिक उपयुक्त",
moderatelySuitable: "मध्यम रूप से उपयुक्त",
suitable: "उपयुक्त",

unableToGetCropRecommendation:
  "फसल की सिफारिश प्राप्त नहीं की जा सकी।",
invalidCropRecommendation:
  "सर्वर से अमान्य फसल सिफारिश प्राप्त हुई।",
unableToConnectCropServer:
  "फसल सिफारिश सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि FastAPI चल रहा है।",


unableToConnectServer:
  "मिट्टी विश्लेषण सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि FastAPI बैकएंड चल रहा है।",
  },

  kn: {
    home: "ಮುಖಪುಟ",
    soilTest: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ",
    analyze: "ವಿಶ್ಲೇಷಣೆ",
    crops: "ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",
    history: "ಇತಿಹಾಸ",
    profile: "ಪ್ರೊಫೈಲ್",

    smartSoilAnalysis: "ಸ್ಮಾರ್ಟ್ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
    goodMorning: "ಶುಭೋದಯ",
    letsUnderstandSoil: "ನಿಮ್ಮ ಮಣ್ಣನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ",
    aiSoilInsights: "AI ಆಧಾರಿತ ಮಣ್ಣಿನ ಮಾಹಿತಿ ಮತ್ತು ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
    analyzeYourSoil: "ನಿಮ್ಮ ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    simpleSoilCropAdvice: "ಮಣ್ಣು ಮತ್ತು ಬೆಳೆಗಳ ಸರಳ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    startAnalysis: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",

    quickActions: "ತ್ವರಿತ ಕಾರ್ಯಗಳು",
    chooseAnOption: "ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ",
    enterNpkValues: "ನಿಮ್ಮ NPK ಮತ್ತು ಮಣ್ಣಿನ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ.",
    findCrops: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",
    findSuitableCrops: "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ.",
    open: "ತೆರೆಯಿರಿ",
    check: "ಪರಿಶೀಲಿಸಿ",

    soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    overallSoilHealth: "ಒಟ್ಟಾರೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    viewResults: "ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ",
    noAnalysis: "ಯಾವುದೇ ವಿಶ್ಲೇಷಣೆ ಇಲ್ಲ",
    basedOnLatestAnalysis: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ.",
    completeAnalysis: "ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ನೋಡಲು ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    nutrientStatus: "ಪೋಷಕಾಂಶಗಳ ಸ್ಥಿತಿ",
    latestCropRecommendation: "ಇತ್ತೀಚಿನ ಬೆಳೆ ಶಿಫಾರಸು",
    modelConfidence: "ಮಾದರಿಯ ವಿಶ್ವಾಸ ಮಟ್ಟ",

    nitrogen: "ಸಾರಜನಕ",
    phosphorus: "ರಂಜಕ",
    potassium: "ಪೊಟ್ಯಾಸಿಯಂ",
    moisture: "ತೇವಾಂಶ",
    organicMatter: "ಸಾವಯವ ಪದಾರ್ಥ",
    ph: "pH",

    good: "ಉತ್ತಮ",
    moderate: "ಮಧ್ಯಮ",
    needsImprovement: "ಸುಧಾರಣೆ ಅಗತ್ಯ",
    review: "ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    low: "ಕಡಿಮೆ",
    noData: "ಡೇಟಾ ಇಲ್ಲ",

    analyzeSoil: "ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    submit: "ಸಲ್ಲಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    back: "ಹಿಂದೆ",

    english: "ಇಂಗ್ಲಿಷ್",
    hindi: "ಹಿಂದಿ",
    kannada: "ಕನ್ನಡ",
    language: "ಭಾಷೆ",

    // Task: Add Kannada translations for the soil analysis page.
soilAnalysis: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
addSoilPhoto: "ಮಣ್ಣಿನ ಫೋಟೋ ಸೇರಿಸಿ",
soilPhotoDescription: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ನಿಮ್ಮ ಫೋನ್‌ನಿಂದ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
takePhoto: "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
useCamera: "ನಿಮ್ಮ ವೆಬ್‌ಕ್ಯಾಮ್ ಅಥವಾ ಫೋನ್ ಕ್ಯಾಮೆರಾವನ್ನು ಬಳಸಿ",
uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
chooseImage: "ನಿಮ್ಮ ಸಾಧನದಿಂದ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
invalidImage: "ಅಮಾನ್ಯ ಚಿತ್ರ",
invalidImageFile: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಚಿತ್ರ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
imageSizeError: "ಚಿತ್ರದ ಗಾತ್ರವು 5 MB ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.",
cameraError: "ಕ್ಯಾಮೆರಾವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕ್ಯಾಮೆರಾ ಅನುಮತಿಯನ್ನು ನೀಡಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
photoTips: "ಫೋಟೋ ಸಲಹೆಗಳು",
goodLighting: "ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
soilClearlyVisible: "ಮಣ್ಣು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ",
avoidBlurry: "ಮಸುಕಾದ ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ",
maxImageSize: "ಗರಿಷ್ಠ ಚಿತ್ರ ಗಾತ್ರ: 5 MB",
takeAPhoto: "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
cameraPosition: "ಕ್ಯಾಮೆರಾ ದೃಶ್ಯದ ಒಳಗೆ ಮಣ್ಣನ್ನು ಇರಿಸಿ.",
capturePhoto: "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಲು ಕ್ಯಾಮೆರಾ ಬಟನ್ ಒತ್ತಿರಿ",
soilPhoto: "ಮಣ್ಣಿನ ಫೋಟೋ",
checkPhoto: "ಮುಂದುವರಿಯುವ ಮೊದಲು ನಿಮ್ಮ ಫೋಟೋವನ್ನು ಪರಿಶೀಲಿಸಿ.",
retakePhoto: "ಮತ್ತೆ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
chooseAnotherPhoto: "ಬೇರೆ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
continue: "ಮುಂದುವರಿಸಿ",

// Task: Add Kannada translations for the History page.
analysisHistory: "ವಿಶ್ಲೇಷಣೆ ಇತಿಹಾಸ",
previousSoilAnalyses: "ನಿಮ್ಮ ಹಿಂದಿನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಗಳು",
totalAnalyses: "ಒಟ್ಟು ವಿಶ್ಲೇಷಣೆಗಳು",
recentAnalyses: "ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆಗಳು",
noAnalysesYet: "ಇನ್ನೂ ಯಾವುದೇ ವಿಶ್ಲೇಷಣೆಗಳಿಲ್ಲ",
completeSoilTestHistory: "ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆ ಇತಿಹಾಸವನ್ನು ನೋಡಲು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
startSoilTest: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
recommended: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
cropRecommendationUnavailable: "ಬೆಳೆ ಶಿಫಾರಸು ಲಭ್ಯವಿಲ್ಲ",
score: "ಸ್ಕೋರ್",
unknownDate: "ಅಜ್ಞಾತ ದಿನಾಂಕ",

// Task: Add Kannada translations for the Profile page.
profileTitle: "ಪ್ರೊಫೈಲ್",
accountPreferences: "ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು",
soilCareUser: "SoilCare ಬಳಕೆದಾರ",
editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
farmInformation: "ಕೃಷಿ ಮಾಹಿತಿ",
farmLocation: "ಕೃಷಿ ಸ್ಥಳ",
addVillageLocation: "ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ",
languageSettings: "ಭಾಷೆ",
availableLanguages: "ಇಂಗ್ಲಿಷ್ • ಹಿಂದಿ • ಮಲಯಾಳಂ",
preferences: "ಆದ್ಯತೆಗಳು",
voiceOutput: "ಧ್ವನಿ ಔಟ್‌ಪುಟ್",
listenRecommendations: "ಮಣ್ಣಿನ ಶಿಫಾರಸುಗಳನ್ನು ಆಲಿಸಿ",
notifications: "ಅಧಿಸೂಚನೆಗಳು",
soilCropUpdates: "ಮಣ್ಣು ಮತ್ತು ಬೆಳೆ ನವೀಕರಣಗಳು",
support: "ಬೆಂಬಲ",
helpSupport: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
getSoilCareHelp: "SoilCare ಬಳಸಲು ಸಹಾಯ ಪಡೆಯಿರಿ",
appSettings: "ಆಪ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
managePreferences: "ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
logout: "ಲಾಗ್‌ಔಟ್",
soilCareTagline: "SoilCare • AI ಆಧಾರಿತ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",

// Task: Add Kannada translations for the Soil Test page.

enterSoilParameters: "ನಿಮ್ಮ ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ",
enterSoilDetails: "ಮಣ್ಣಿನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
soilTestReportDescription: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ವರದಿಯಿಂದ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ.",

analysisFailed: "ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ",
unableToAnalyzeSoil: "ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

enterNitrogen: "N ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
enterPhosphorus: "P ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
enterPotassium: "K ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
examplePh: "ಉದಾಹರಣೆ: 6.5",
exampleMoisture: "ಉದಾಹರಣೆ: 60",
exampleOrganicMatter: "ಉದಾಹರಣೆ: 3.5",

pleaseEnterNitrogen: "ದಯವಿಟ್ಟು ನೈಟ್ರೋಜನ್ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
nitrogenCannotBeNegative: "ನೈಟ್ರೋಜನ್ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.",
pleaseEnterPhosphorus: "ದಯವಿಟ್ಟು ಫಾಸ್ಫರಸ್ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
phosphorusCannotBeNegative: "ಫಾಸ್ಫರಸ್ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.",
pleaseEnterPotassium: "ದಯವಿಟ್ಟು ಪೊಟ್ಯಾಸಿಯಮ್ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
potassiumCannotBeNegative: "ಪೊಟ್ಯಾಸಿಯಮ್ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.",
pleaseEnterSoilPh: "ದಯವಿಟ್ಟು ಮಣ್ಣಿನ pH ನಮೂದಿಸಿ.",
phBetween: "pH 0 ಮತ್ತು 14ರ ನಡುವೆ ಇರಬೇಕು.",
pleaseEnterMoisture: "ದಯವಿಟ್ಟು ತೇವಾಂಶದ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
moistureBetween: "ತೇವಾಂಶವು 0 ರಿಂದ 100%ರ ನಡುವೆ ಇರಬೇಕು.",
pleaseEnterOrganicMatter: "ದಯವಿಟ್ಟು ಸಾವಯವ ಪದಾರ್ಥದ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
organicMatterBetween: "ಸಾವಯವ ಪದಾರ್ಥವು 0 ರಿಂದ 100%ರ ನಡುವೆ ಇರಬೇಕು.",

analyzingSoil: "ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",


soilAnalysisComplete: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
soilAnalyzedSuccessfully: "ನಿಮ್ಮ ಮಣ್ಣನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.",

healthScore: "ಆರೋಗ್ಯ ಸ್ಕೋರ್",
notAvailable: "ಲಭ್ಯವಿಲ್ಲ",

nutrientAnalysis: "ಪೋಷಕಾಂಶ ವಿಶ್ಲೇಷಣೆ",


recommendedCrop: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ",

// Task: Add Kannada translations for the Find Suitable Crops page.

findSuitableCropsTitle: "ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",
findCropsForSoil: "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",
findRightCrop: "ಸರಿಯಾದ ಬೆಳೆಯನ್ನು ಹುಡುಕಿ",
cropRecommendationDescription:
  "ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ನಮೂದಿಸಿ.",

recommendationFailed: "ಶಿಫಾರಸು ವಿಫಲವಾಗಿದೆ",
pleaseEnterAllSoilConditions:
  "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ನಮೂದಿಸಿ.",
pleaseEnterValidNumbers:
  "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಸಂಖ್ಯಾ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ.",
soilValuesCannotBeNegative:
  "ಮಣ್ಣಿನ ಮೌಲ್ಯಗಳು ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.",
phMustBeBetween:
  "pH 0 ಮತ್ತು 14ರ ನಡುವೆ ಇರಬೇಕು.",
moistureMustBeBetween:
  "ತೇವಾಂಶವು 0 ರಿಂದ 100%ರ ನಡುವೆ ಇರಬೇಕು.",

enterNValue: "N ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
enterPValue: "P ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
enterKValue: "K ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
examplePhValue: "ಉದಾಹರಣೆ: 6.5",
enterMoistureValue: "ತೇವಾಂಶದ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ",
enterRainfallValue: "ಮಳೆಯ ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ",

soilConditions: "ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳು",
rainfall: "ಮಳೆ",

findingCrops: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
findSuitableCropsButton: "ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",

highlySuitable: "ಹೆಚ್ಚು ಸೂಕ್ತ",
moderatelySuitable: "ಮಧ್ಯಮವಾಗಿ ಸೂಕ್ತ",
suitable: "ಸೂಕ್ತ",

unableToGetCropRecommendation:
  "ಬೆಳೆ ಶಿಫಾರಸನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
invalidCropRecommendation:
  "ಸರ್ವರ್‌ನಿಂದ ಅಮಾನ್ಯ ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲಾಗಿದೆ.",
unableToConnectCropServer:
  "ಬೆಳೆ ಶಿಫಾರಸು ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. FastAPI ಚಾಲನೆಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",


unableToConnectServer:
  "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣಾ ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. FastAPI ಬ್ಯಾಕೆಂಡ್ ಚಾಲನೆಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  },

};

// Malayalam is layered over the existing English key set so all established
// translation keys remain available while the farmer-facing language option is Malayalam.
const malayalamTranslations = {
  ...baseTranslations.en,
  home: "ഹോം",
  soilTest: "മണ്ണ് പരിശോധന",
  analyze: "വിശകലനം",
  crops: "അനുയോജ്യമായ വിളകൾ",
  history: "ചരിത്രം",
  profile: "പ്രൊഫൈൽ",
  smartSoilAnalysis: "സ്മാർട്ട് മണ്ണ് വിശകലനം",
  goodMorning: "സുപ്രഭാതം",
  letsUnderstandSoil: "നിങ്ങളുടെ മണ്ണിനെ മനസ്സിലാക്കാം",
  aiSoilInsights: "AI അടിസ്ഥാനമാക്കിയുള്ള മണ്ണ് വിവരങ്ങളും വിള നിർദ്ദേശങ്ങളും.",
  analyzeYourSoil: "നിങ്ങളുടെ മണ്ണ് വിശകലനം ചെയ്യുക",
  simpleSoilCropAdvice: "ലളിതമായ മണ്ണ്, വിള ഉപദേശം നേടുക.",
  startAnalysis: "വിശകലനം ആരംഭിക്കുക",
  quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
  chooseAnOption: "ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക",
  enterNpkValues: "NPKയും മണ്ണ് മൂല്യങ്ങളും നൽകുക.",
  findCrops: "വിളകൾ കണ്ടെത്തുക",
  findSuitableCrops: "നിങ്ങളുടെ മണ്ണിന് അനുയോജ്യമായ വിളകൾ കണ്ടെത്തുക.",
  soilHealth: "മണ്ണിന്റെ ആരോഗ്യം",
  overallSoilHealth: "മൊത്തം മണ്ണിന്റെ ആരോഗ്യം",
  viewResults: "ഫലങ്ങൾ കാണുക",
  nutrientStatus: "പോഷക നില",
  latestCropRecommendation: "ഏറ്റവും പുതിയ വിള നിർദ്ദേശം",
  modelConfidence: "മോഡൽ വിശ്വാസ്യത",
  nitrogen: "നൈട്രജൻ",
  phosphorus: "ഫോസ്ഫറസ്",
  potassium: "പൊട്ടാസ്യം",
  moisture: "ഈർപ്പം",
  organicMatter: "ജൈവ പദാർത്ഥം",
  good: "നല്ലത്",
  moderate: "മിതമായത്",
  needsImprovement: "മെച്ചപ്പെടുത്തണം",
  review: "പരിശോധിക്കുക",
  low: "കുറവ്",
  noData: "ഡാറ്റ ഇല്ല",
  analyzeSoil: "മണ്ണ് വിശകലനം ചെയ്യുക",
  submit: "സമർപ്പിക്കുക",
  cancel: "റദ്ദാക്കുക",
  back: "പിന്നോട്ട്",
  english: "ഇംഗ്ലീഷ്",
  hindi: "ഹിന്ദി",
  kannada: "മലയാളം",
  language: "ഭാഷ",
  soilAnalysis: "മണ്ണ് വിശകലനം",
  addSoilPhoto: "മണ്ണിന്റെ ചിത്രം ചേർക്കുക",
  takePhoto: "ചിത്രം എടുക്കുക",
  uploadPhoto: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
  chooseImage: "നിങ്ങളുടെ ഉപകരണത്തിൽ നിന്ന് ചിത്രം തിരഞ്ഞെടുക്കുക",
  photoTips: "ചിത്രത്തിനുള്ള നിർദ്ദേശങ്ങൾ",
  takeAPhoto: "ഒരു ചിത്രം എടുക്കുക",
  capturePhoto: "ചിത്രം എടുക്കാൻ ക്യാമറ ബട്ടൺ അമർത്തുക",
  retakePhoto: "വീണ്ടും ചിത്രം എടുക്കുക",
  continue: "തുടരുക",
  analysisHistory: "വിശകലന ചരിത്രം",
  previousSoilAnalyses: "നിങ്ങളുടെ മുൻ മണ്ണ് വിശകലനങ്ങൾ",
  totalAnalyses: "മൊത്തം വിശകലനങ്ങൾ",
  recentAnalyses: "സമീപകാല വിശകലനങ്ങൾ",
  noAnalysesYet: "ഇതുവരെ വിശകലനങ്ങളില്ല",
  startSoilTest: "മണ്ണ് പരിശോധന ആരംഭിക്കുക",
  recommended: "ശുപാർശ ചെയ്തത്",
  score: "സ്കോർ",
  profileTitle: "പ്രൊഫൈൽ",
  accountPreferences: "നിങ്ങളുടെ അക്കൗണ്ടും മുൻഗണനകളും",
  languageSettings: "ഭാഷ",
  availableLanguages: "ഇംഗ്ലീഷ് • ഹിന്ദി • മലയാളം",
  voiceOutput: "ശബ്ദ ഔട്ട്പുട്ട്",
  listenRecommendations: "മണ്ണ് നിർദ്ദേശങ്ങൾ കേൾക്കുക",
  enterSoilParameters: "നിങ്ങളുടെ മണ്ണ് മൂല്യങ്ങൾ നൽകുക",
  enterSoilDetails: "മണ്ണിന്റെ വിവരങ്ങൾ നൽകുക",
  analyzingSoil: "മണ്ണ് വിശകലനം ചെയ്യുന്നു...",
  soilAnalysisComplete: "മണ്ണ് വിശകലനം പൂർത്തിയായി",
  healthScore: "ആരോഗ്യ സ്കോർ",
  nutrientAnalysis: "പോഷക വിശകലനം",
  recommendedCrop: "ശുപാർശ ചെയ്ത വിള",
} as const;

export const translations = {
  ...baseTranslations,
  ml: malayalamTranslations,
};



export type TranslationKey = keyof typeof translations.en;
