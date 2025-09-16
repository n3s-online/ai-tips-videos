import { config } from "dotenv";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import * as fs from "fs";
import * as path from "path";
import enquirer from "enquirer";

// Load environment variables from .env file
config();

async function processPdfWithClaude() {
  try {
    // Check for Anthropic API key
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY environment variable is required");
    }

    // Prompt for PDF file path
    const { pdfFilePath } = (await enquirer.prompt({
      type: "input",
      name: "pdfFilePath",
      message: "Enter the path to your PDF file:",
      initial: "assets/Taylor_C602_Instruction_Manual.pdf",
    })) as { pdfFilePath: string };

    // Prompt for question
    const { question } = (await enquirer.prompt({
      type: "input",
      name: "question",
      message: "What question would you like to ask about the PDF?",
      initial: "the icecream is coming out brown, what do I do?",
    })) as { question: string };

    // Check if PDF file exists
    const pdfPath = path.resolve(pdfFilePath);
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found at: ${pdfPath}`);
    }

    // Read PDF file as buffer for direct processing by Claude
    console.log("Reading PDF file...");
    const pdfBuffer = fs.readFileSync(pdfPath);
    console.log(
      `PDF loaded successfully. File size: ${pdfBuffer.length} bytes`
    );

    // Generate response using Claude 3.5 Sonnet with native PDF support
    console.log("Querying Claude 3.5 Sonnet with PDF...");
    const result = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze the attached PDF document and answer this question: "${question}"`,
            },
            {
              type: "file",
              data: pdfBuffer,
              mediaType: "application/pdf",
            },
          ],
        },
      ],
      maxRetries: 0, // Disable retries to see actual error
    });

    // Log the response
    console.log("\n=== Claude 3.5 Sonnet Response ===");
    console.log(result.text);
    console.log("\n=== End Response ===");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the function
processPdfWithClaude();
