// Task: Build the SoilCare English, Hindi, and Malayalam voice assistant.

"use client";

import { useState } from "react";
import { useLanguage } from "../translations/LanguageProvider";

type SoilAnalysisResult = {
  crop_recommendation?: {
    crop?: string;
    confidence?: number;
  };
  soil_health?: {
    score?: number;
    status?: string;
  };
  nutrient_analysis?: {
    deficiency_category?: string;
  };
  fertilizer_recommendation?: {
    fertilizer_type?: string;
    recommendation?: string;
  };
};

export default function VoiceAssistant() {
  const { language } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Task: Get the browser speech language based on the selected SoilCare language.
  const getSpeechLanguage = () => {
    if (language === "hi") {
      return "hi-IN";
    }

    if (language === "kn") {
      return "kn-IN";
    }

    if (language === "ml") {
      return "ml-IN";
    }

    return "en-IN";
  };

  // Task: Read the latest soil analysis saved by the Soil Test page.
  const getLatestAnalysis = (): SoilAnalysisResult | null => {
    const savedResult = localStorage.getItem("soil_analysis_result");

    if (!savedResult) {
      return null;
    }

    try {
      return JSON.parse(savedResult);
    } catch {
      return null;
    }
  };

  // Task: Convert backend crop names into farmer-friendly language.
  const getCropName = (crop: string) => {
    const cropNames: Record<string, Record<string, string>> = {
      rice: {
        en: "rice",
        hi: "चावल",
        kn: "ಅಕ್ಕಿ",
      },
      wheat: {
        en: "wheat",
        hi: "गेहूं",
        kn: "ಗೋಧಿ",
      },
      maize: {
        en: "maize",
        hi: "मक्का",
        kn: "ಮೆಕ್ಕೆಜೋಳ",
      },
      banana: {
        en: "banana",
        hi: "केला",
        kn: "ಬಾಳೆಹಣ್ಣು",
      },
      coconut: {
        en: "coconut",
        hi: "नारियल",
        kn: "ತೆಂಗಿನಕಾಯಿ",
      },
      cotton: {
        en: "cotton",
        hi: "कपास",
        kn: "ಹತ್ತಿ",
      },
      coffee: {
        en: "coffee",
        hi: "कॉफी",
        kn: "ಕಾಫಿ",
      },
      apple: {
        en: "apple",
        hi: "सेब",
        kn: "ಸೇಬು",
      },
      grapes: {
        en: "grapes",
        hi: "अंगूर",
        kn: "ದ್ರಾಕ್ಷಿ",
      },
      mango: {
        en: "mango",
        hi: "आम",
        kn: "ಮಾವು",
      },
      papaya: {
        en: "papaya",
        hi: "पपीता",
        kn: "ಪಪ್ಪಾಯಿ",
      },
      orange: {
        en: "orange",
        hi: "संतरा",
        kn: "ಕಿತ್ತಳೆ",
      },
      watermelon: {
        en: "watermelon",
        hi: "तरबूज",
        kn: "ಕಲ್ಲಂಗಡಿ",
      },
    };

    const normalizedCrop = crop.toLowerCase();

    const malayalamCropNames: Record<string, string> = {
      rice: "അരി",
      wheat: "ഗോതമ്പ്",
      maize: "ചോളം",
      banana: "വാഴപ്പഴം",
      coconut: "തേങ്ങ",
      cotton: "പരുത്തി",
      coffee: "കാപ്പി",
      apple: "ആപ്പിൾ",
      grapes: "മുന്തിരി",
      mango: "മാങ്ങ",
      papaya: "പപ്പായ",
      orange: "ഓറഞ്ച്",
      watermelon: "തണ്ണിമത്തൻ",
    };

    return (
      cropNames[normalizedCrop]?.[language] ||
      (language === "ml" ? malayalamCropNames[normalizedCrop] : undefined) ||
      crop
    );
  };

  // Task: Convert soil health status into the selected language.
  const getHealthStatus = (status: string) => {
    if (status === "Good") {
      if (language === "hi") {
        return "अच्छी";
      }

      if (language === "kn") {
        return "ಉತ್ತಮ";
      }

      return "Good";
    }

    if (status === "Moderate") {
      if (language === "hi") {
        return "मध्यम";
      }

      if (language === "kn") {
        return "ಮಧ್ಯಮ";
      }

      return "Moderate";
    }

    if (status === "Needs Improvement") {
      if (language === "hi") {
        return "सुधार की आवश्यकता है";
      }

      if (language === "kn") {
        return "ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ";
      }

      return "Needs Improvement";
    }

    return status;
  };

  // Task: Select an available browser voice matching the selected language.
  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    // Task: Stop any previous speech.
    window.speechSynthesis.cancel();

    const speak = () => {
      // Task: Get all voices available from the browser.
      const voices = window.speechSynthesis.getVoices();

      const speechLanguage = getSpeechLanguage();

      // Task: Find an exact language voice such as kn-IN.
      let selectedVoice = voices.find(
        (voice) =>
          voice.lang.toLowerCase() ===
          speechLanguage.toLowerCase()
      );

      // Task: Find a broader language voice such as kn if kn-IN is unavailable.
      if (!selectedVoice) {
        const languageCode =
          speechLanguage.split("-")[0].toLowerCase();

        selectedVoice = voices.find((voice) =>
          voice.lang
            .toLowerCase()
            .startsWith(languageCode)
        );
      }

      // Task: Create the speech utterance.
      const speech =
        new SpeechSynthesisUtterance(text);

      // Task: Set the selected language.
      speech.lang = speechLanguage;

      // Task: Use the matching voice when one is available.
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      // Task: Configure comfortable speech settings.
      speech.rate = 0.9;
      speech.pitch = 1;

      speech.onstart = () => {
        setIsSpeaking(true);
      };

      speech.onend = () => {
        setIsSpeaking(false);
      };

      speech.onerror = () => {
        setIsSpeaking(false);
      };

      // Task: Speak the SoilCare response.
      window.speechSynthesis.speak(speech);
    };

    // Task: Wait until browser voices are loaded.
    const voices =
      window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged =
        () => {
          window.speechSynthesis.onvoiceschanged =
            null;

          speak();
        };
    } else {
      speak();
    }
  };

  // Task: Understand the farmer's question and generate a response from the latest soil analysis.
  const understandQuestion = (text: string) => {
    const question = text.toLowerCase();

    const analysis = getLatestAnalysis();

    // Task: Handle the case where no soil analysis exists.
    if (!analysis) {
      if (language === "hi") {
        return "कृपया पहले मिट्टी का विश्लेषण पूरा करें ताकि मैं आपको व्यक्तिगत सलाह दे सकूं।";
      }

      if (language === "kn") {
        return "ದಯವಿಟ್ಟು ಮೊದಲು ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ, ನಂತರ ನಾನು ನಿಮಗೆ ವೈಯಕ್ತಿಕ ಸಲಹೆ ನೀಡುತ್ತೇನೆ.";
      }

      return "Please complete a soil analysis first so I can give you personalized advice.";
    }

    // ============================================================
    // CROP RECOMMENDATION
    // ============================================================

    // Task: Detect crop recommendation questions.
    const cropQuestion =
      question.includes("crop") ||
      question.includes("grow") ||
      question.includes("plant") ||
      question.includes("ಬೆಳೆ") ||
      question.includes("ಬೆಳೆಯ") ||
      question.includes("ಯಾವ ಬೆಳೆ") ||
      question.includes("फसल") ||
      question.includes("उगाना") ||
      question.includes("उगाऊं");

    if (cropQuestion) {
      const crop =
        analysis.crop_recommendation?.crop;

      const confidence =
        analysis.crop_recommendation?.confidence;

      if (!crop) {
        if (language === "hi") {
          return "मुझे आपकी नवीनतम मिट्टी जांच में फसल की सिफारिश नहीं मिली।";
        }

        if (language === "kn") {
          return "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ಬೆಳೆ ಶಿಫಾರಸು ಕಂಡುಬಂದಿಲ್ಲ.";
        }

        return "I could not find a crop recommendation in your latest analysis.";
      }

      const translatedCrop =
        getCropName(crop);

      if (language === "hi") {
        return `आपकी नवीनतम मिट्टी जांच के आधार पर, ${translatedCrop} की सिफारिश की गई है। मॉडल का विश्वास ${confidence ?? 0} प्रतिशत है।`;
      }

      if (language === "kn") {
        return `ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ, ${translatedCrop} ಬೆಳೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ. ಮಾದರಿಯ ವಿಶ್ವಾಸಾರ್ಹತೆ ${confidence ?? 0} ಪ್ರತಿಶತವಾಗಿದೆ.`;
      }

      return `Based on your latest soil analysis, the recommended crop is ${translatedCrop}. The model confidence is ${confidence ?? 0} percent.`;
    }

    // ============================================================
    // SOIL HEALTH
    // ============================================================

    // Task: Detect soil health questions.
    const healthQuestion =
      question.includes("soil health") ||
      question.includes("soil condition") ||
      question.includes("healthy") ||
      question.includes("ಮಣ್ಣಿನ ಆರೋಗ್ಯ") ||
      question.includes("ಮಣ್ಣು ಹೇಗಿದೆ") ||
      question.includes("ಮಣ್ಣು ಆರೋಗ್ಯ") ||
      question.includes("मिट्टी का स्वास्थ्य") ||
      question.includes("मिट्टी कैसी") ||
      question.includes("मिट्टी स्वस्थ");

    if (healthQuestion) {
      const score =
        analysis.soil_health?.score;

      const status =
        analysis.soil_health?.status;

      const translatedStatus =
        getHealthStatus(status ?? "");

      if (language === "hi") {
        return `आपका मिट्टी स्वास्थ्य स्कोर 100 में से ${score ?? "उपलब्ध नहीं"} है और वर्तमान स्थिति ${translatedStatus} है।`;
      }

      if (language === "kn") {
        return `ನಿಮ್ಮ ಮಣ್ಣಿನ ಆರೋಗ್ಯದ ಸ್ಕೋರ್ 100ರಲ್ಲಿ ${score ?? "ಲಭ್ಯವಿಲ್ಲ"} ಆಗಿದೆ ಮತ್ತು ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ${translatedStatus} ಆಗಿದೆ.`;
      }

      return `Your soil health score is ${score ?? "not available"} out of 100, and the current status is ${translatedStatus}.`;
    }

    // ============================================================
    // FERTILIZER
    // ============================================================

    // Task: Detect fertilizer questions.
    const fertilizerQuestion =
      question.includes("fertilizer") ||
      question.includes("fertiliser") ||
      question.includes("ಗೊಬ್ಬರ") ||
      question.includes("ರಸಗೊಬ್ಬರ") ||
      question.includes("उर्वरक") ||
      question.includes("खाद");

    if (fertilizerQuestion) {
      const fertilizer =
        analysis.fertilizer_recommendation
          ?.fertilizer_type;

      const recommendation =
        analysis.fertilizer_recommendation
          ?.recommendation;

      if (language === "hi") {
        if (
          fertilizer ===
          "No immediate fertilizer requirement"
        ) {
          return "अभी किसी उर्वरक की आवश्यकता नहीं है। वर्तमान पोषक तत्व प्रबंधन को बनाए रखें और मिट्टी के पोषक तत्वों की नियमित निगरानी करें।";
        }

        return `${fertilizer ?? "उर्वरक की जानकारी उपलब्ध नहीं है"}। ${recommendation ?? ""}`;
      }

      if (language === "kn") {
        if (
          fertilizer ===
          "No immediate fertilizer requirement"
        ) {
          return "ಈಗ ಯಾವುದೇ ರಸಗೊಬ್ಬರದ ಅಗತ್ಯವಿಲ್ಲ. ಪ್ರಸ್ತುತ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.";
        }

        return `${fertilizer ?? "ರಸಗೊಬ್ಬರದ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ"}. ${recommendation ?? ""}`;
      }

      return `${fertilizer ?? "No fertilizer information is available"}. ${recommendation ?? ""}`;
    }

    // ============================================================
    // NUTRIENT DEFICIENCY
    // ============================================================

    // Task: Detect nutrient deficiency questions.
    const nutrientQuestion =
      question.includes("deficiency") ||
      question.includes("deficient") ||
      question.includes("nutrient") ||
      question.includes("ಪೋಷಕಾಂಶ") ||
      question.includes("ಕೊರತೆ") ||
      question.includes("ಪೋಷಕಾಂಶದ ಕೊರತೆ") ||
      question.includes("पोषक तत्व") ||
      question.includes("कमी") ||
      question.includes("पोषक तत्वों की कमी");

    if (nutrientQuestion) {
      const deficiency =
        analysis.nutrient_analysis
          ?.deficiency_category;

      if (deficiency === "No_Deficiency") {
        if (language === "hi") {
          return "आपकी नवीनतम मिट्टी जांच में किसी भी पोषक तत्व की कमी नहीं पाई गई है।";
        }

        if (language === "kn") {
          return "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ಯಾವುದೇ ಪೋಷಕಾಂಶದ ಕೊರತೆ ಕಂಡುಬಂದಿಲ್ಲ.";
        }

        return "Your latest soil analysis shows no nutrient deficiency.";
      }

      if (language === "hi") {
        return `आपकी नवीनतम पोषक तत्व जांच में ${deficiency ?? "अज्ञात स्थिति"} पाई गई है।`;
      }

      if (language === "kn") {
        return `ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಪೋಷಕಾಂಶ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ${deficiency ?? "ಅಜ್ಞಾತ ಸ್ಥಿತಿ"} ಕಂಡುಬಂದಿದೆ.`;
      }

      return `Your latest nutrient analysis shows ${deficiency ?? "an unknown nutrient status"}.`;
    }

    // ============================================================
    // FALLBACK
    // ============================================================

    // Task: Provide a fallback response in the selected language.
    if (language === "hi") {
      return "ನಾನು ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ, ರಸಗೊಬ್ಬರದ ಶಿಫಾರಸು ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು.";
    }

    if (language === "kn") {
      return "ನಾನು ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ, ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು.";
    }

    return "I can help you with soil health, nutrient deficiency, fertilizer recommendations, and suitable crops.";
  };

  // Task: Start speech recognition when the farmer presses the microphone button.
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    // Task: Stop any currently playing response.
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Task: Create speech recognition.
    const recognition =
      new SpeechRecognition();

    // Task: Set recognition language based on the selected language.
    recognition.lang = getSpeechLanguage();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      // Task: Show listening state.
      setIsListening(true);

      // Task: Clear the previous response.
      setResponse("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Task: Get the farmer's spoken question.
      const text =
        event.results[0][0].transcript;

      // Task: Display the recognized question.
      setTranscript(text);

      // Task: Generate the SoilCare response.
      const assistantResponse =
        understandQuestion(text);

      // Task: Display the response.
      setResponse(assistantResponse);

      // Task: Speak the response in the selected language.
      speakResponse(assistantResponse);
    };

    recognition.onerror = () => {
      // Task: Stop listening when an error occurs.
      setIsListening(false);
    };

    recognition.onend = () => {
      // Task: Stop listening when recognition ends.
      setIsListening(false);
    };

    // Task: Start listening.
    recognition.start();
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Task: Display voice assistant heading. */}
      <h2 className="text-lg font-semibold text-[#075C42]">
        Voice Assistant
      </h2>

      {/* Task: Display voice assistant description. */}
      <p className="mt-1 text-sm text-gray-600">
        Ask SoilCare a question using your voice.
      </p>

      {/* Task: Display microphone button. */}
      <button
        type="button"
        onClick={startListening}
        className="mt-4 rounded-full bg-[#16824F] px-5 py-3 font-medium text-white"
      >
        🎤 {isListening ? "Listening..." : "Speak"}
      </button>

      {/* Task: Display speaking status. */}
      {isSpeaking && (
        <p className="mt-3 text-sm text-green-700">
          🔊 SoilCare is speaking...
        </p>
      )}

      {/* Task: Display recognized speech. */}
      {transcript && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-500">
            You said:
          </p>

          <p className="mt-1 text-gray-800">
            {transcript}
          </p>
        </div>
      )}

      {/* Task: Display assistant response. */}
      {response && (
        <div className="mt-3 rounded-lg bg-green-50 p-3">
          <p className="text-sm font-medium text-[#075C42]">
            SoilCare:
          </p>

          <p className="mt-1 text-sm text-gray-700">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
