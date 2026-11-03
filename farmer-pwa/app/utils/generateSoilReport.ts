// Task: Generate a downloadable PDF soil analysis report.

import jsPDF from "jspdf";

type SoilAnalysis = {
  soil_data?: {
    nitrogen?: number;
    phosphorus?: number;
    potassium?: number;
    ph?: number;
    moisture?: number;
    organic_matter?: number;
  };

  nutrient_analysis?: {
    deficiency_category?: string;
  };

  crop_recommendation?: {
    crop?: string;
    confidence?: number;
  };

  soil_health?: {
    score?: number;
    status?: string;
  };

  fertilizer_recommendation?: {
    fertilizer_type?: string;
    recommendation?: string;
    timing?: string;
    method?: string;
    precaution?: string;
  };

  soil_management?: string[];
};

export function generateSoilReport(
  analysis: SoilAnalysis,
  language: "en" | "hi" | "kn" | "ml" = "en"
) {
  // Task: Create the PDF document.
  const doc = new jsPDF();

  // Task: Read soil data with safe fallback values.
  const data = analysis.soil_data ?? {};

  const nitrogen = data.nitrogen ?? 0;
  const phosphorus = data.phosphorus ?? 0;
  const potassium = data.potassium ?? 0;
  const ph = data.ph ?? 0;
  const moisture = data.moisture ?? 0;
  const organicMatter = data.organic_matter ?? 0;

  // Task: Read nutrient analysis with fallback values.
  const deficiency =
    analysis.nutrient_analysis?.deficiency_category ??
    "No_Deficiency";

  // Task: Read crop recommendation with fallback values.
  const recommendedCrop =
    analysis.crop_recommendation?.crop ??
    "Not available";

  const confidence =
    analysis.crop_recommendation?.confidence ??
    0;

  // Task: Read soil health information with fallback values.
  const healthScore =
    analysis.soil_health?.score ??
    0;

  const healthStatus =
    analysis.soil_health?.status ??
    "Unknown";

  // Task: Read fertilizer recommendation with fallback values.
  const fertilizer =
    analysis.fertilizer_recommendation ?? {};

  const fertilizerType =
    fertilizer.fertilizer_type ??
    "Not available";

  const fertilizerRecommendation =
    fertilizer.recommendation ??
    "Not available";

  const fertilizerTiming =
    fertilizer.timing ??
    "Not available";

  const fertilizerMethod =
    fertilizer.method ??
    "Not available";

  const fertilizerPrecaution =
    fertilizer.precaution ??
    "Not available";

  // Task: Read soil management recommendations.
  const management =
    analysis.soil_management ?? [];

  // Task: Get the current analysis date.
  const today = new Date().toLocaleDateString("en-IN");

  // Task: Keep the language parameter ready for future multilingual PDF support.
  void language;

  // --------------------------------------------------
  // TITLE
  // --------------------------------------------------

  // Task: Add report title.
  doc.setFontSize(20);
  doc.text("SoilCare", 20, 20);

  doc.setFontSize(15);
  doc.text("Soil Analysis Report", 20, 32);

  doc.setFontSize(10);
  doc.text(`Analysis Date: ${today}`, 20, 42);

  // --------------------------------------------------
  // SOIL PARAMETERS
  // --------------------------------------------------

  // Task: Add soil parameter section.
  doc.setFontSize(14);
  doc.text("Soil Parameters", 20, 58);

  doc.setFontSize(11);

  let y = 68;

  doc.text(`Nitrogen (N): ${nitrogen}`, 25, y);
  y += 8;

  doc.text(`Phosphorus (P): ${phosphorus}`, 25, y);
  y += 8;

  doc.text(`Potassium (K): ${potassium}`, 25, y);
  y += 8;

  doc.text(`pH: ${ph}`, 25, y);
  y += 8;

  doc.text(`Moisture: ${moisture}%`, 25, y);
  y += 8;

  doc.text(`Organic Matter: ${organicMatter}`, 25, y);

  // --------------------------------------------------
  // SOIL HEALTH
  // --------------------------------------------------

  // Task: Add soil health information.
  y += 18;

  doc.setFontSize(14);
  doc.text("Soil Health", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.text(`Health Score: ${healthScore}/100`, 25, y);

  y += 8;

  doc.text(`Status: ${healthStatus}`, 25, y);

  // --------------------------------------------------
  // NUTRIENT ANALYSIS
  // --------------------------------------------------

  // Task: Add nutrient analysis.
  y += 18;

  doc.setFontSize(14);
  doc.text("Nutrient Analysis", 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.text(`Deficiency: ${deficiency}`, 25, y);

  // --------------------------------------------------
  // CROP RECOMMENDATION
  // --------------------------------------------------

  // Task: Add crop recommendation.
  y += 18;

  doc.setFontSize(14);
  doc.text("Crop Recommendation", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Recommended Crop: ${recommendedCrop}`,
    25,
    y
  );

  y += 8;

  doc.text(
    `Confidence: ${confidence.toFixed(2)}%`,
    25,
    y
  );

  // --------------------------------------------------
  // FERTILIZER RECOMMENDATION
  // --------------------------------------------------

  // Task: Add fertilizer recommendation.
  y += 18;

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(14);
  doc.text("Fertilizer Recommendation", 20, y);

  y += 10;

  doc.setFontSize(11);

  const fertilizerLines = [
    `Type: ${fertilizerType}`,
    `Recommendation: ${fertilizerRecommendation}`,
    `Timing: ${fertilizerTiming}`,
    `Method: ${fertilizerMethod}`,
    `Precaution: ${fertilizerPrecaution}`,
  ];

  fertilizerLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 165);

    doc.text(wrapped, 25, y);

    y += wrapped.length * 6 + 2;

    // Task: Create a new page if the fertilizer section becomes too long.
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  });

  // --------------------------------------------------
  // SOIL MANAGEMENT
  // --------------------------------------------------

  // Task: Add soil management recommendations.
  y += 8;

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(14);
  doc.text("Soil Management", 20, y);

  y += 10;

  doc.setFontSize(11);

  if (management.length === 0) {
    doc.text("No management recommendations available.", 25, y);
    y += 8;
  } else {
    management.forEach((item, index) => {
      const wrapped = doc.splitTextToSize(
        `${index + 1}. ${item}`,
        165
      );

      doc.text(wrapped, 25, y);

      y += wrapped.length * 6 + 3;

      // Task: Create a new page when required.
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });
  }

  // --------------------------------------------------
  // DISCLAIMER
  // --------------------------------------------------

  // Task: Add project disclaimer.
  y += 8;

  if (y > 270) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(8);

  const disclaimer =
    "SoilCare recommendations are AI-assisted and should be verified with appropriate agricultural guidance.";

  const disclaimerLines = doc.splitTextToSize(
    disclaimer,
    170
  );

  doc.text(disclaimerLines, 20, y);

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  // Task: Download the generated PDF.
  doc.save(
    `SoilCare-Soil-Analysis-${today.replace(/\//g, "-")}.pdf`
  );
}
