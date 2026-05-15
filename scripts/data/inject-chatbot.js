import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DATA_PATH = path.join(__dirname, "../..", "src/content/lifeEvents/base-life-events.json");
const CHATBOT_CSV_PATH = path.join(__dirname, "chatbot-conversations.csv");

// Parse CSV with proper quote handling
function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        // Escaped quote: "" becomes "
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      // End of field
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  // Add last field
  if (current) {
    fields.push(current.trim());
  }

  return fields;
}

// Read CSV file
const csvContent = fs.readFileSync(CHATBOT_CSV_PATH, "utf-8");
const lines = csvContent.trim().split("\n");
const headerLine = lines[0];
const headers = parseCSVLine(headerLine);

const chapterIdx = headers.indexOf("chapter_id");
const stepIdx = headers.indexOf("step_index");
const convIdx = headers.indexOf("conversation");

console.log(`📊 CSV Headers: ${headers.join(", ")}`);
console.log(`   Indices: chapter_id=${chapterIdx}, step_index=${stepIdx}, conversation=${convIdx}`);

const records = [];
for (let i = 1; i < lines.length; i++) {
  const fields = parseCSVLine(lines[i]);
  if (fields.length > Math.max(chapterIdx, stepIdx, convIdx)) {
    records.push({
      chapter_id: fields[chapterIdx],
      step_index: fields[stepIdx],
      conversation: fields[convIdx],
    });
  }
}

console.log(`📊 Loaded ${records.length} chatbot conversation entries from CSV\n`);

// Read JSON data
const lifeEventsData = JSON.parse(fs.readFileSync(BASE_DATA_PATH, "utf-8"));

// Process each CSV record
records.forEach((record) => {
  const { chapter_id, step_index, conversation } = record;
  const stepIdx = parseInt(step_index, 10);

  // Find the chapter
  const chapter = lifeEventsData.find((ch) => ch.id === chapter_id);
  if (!chapter) {
    console.warn(`⚠️  Chapter ${chapter_id} not found`);
    return;
  }

  // Get the step
  const step = chapter.microJourney[stepIdx];
  if (!step) {
    console.warn(`⚠️  Step ${stepIdx} not found in ${chapter_id}`);
    return;
  }

  // Parse conversation JSON
  try {
    const messages = JSON.parse(conversation);

    // Update step with chatbot conversation
    step.channel = "chatbot";
    step.eventTypeExperience = "Agentic Chat Experience";
    step.chatbotConversation = {
      messages,
    };

    console.log(`✅ Injected ${messages.length} messages into ${chapter_id}[${stepIdx}]`);
  } catch (err) {
    console.error(`❌ Failed to parse JSON for ${chapter_id}[${stepIdx}]:`, err.message);
    console.error(`   First 100 chars: ${conversation.substring(0, 100)}`);
  }
});

// Write updated data back
fs.writeFileSync(BASE_DATA_PATH, JSON.stringify(lifeEventsData, null, 2));

console.log(`\n✨ Chatbot data injected successfully into ${BASE_DATA_PATH}`);
