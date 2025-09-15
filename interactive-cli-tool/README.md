# PDF Processing with Claude 3.5 Sonnet

A Node.js TypeScript application that processes PDF documents using Claude 3.5 Sonnet via the Vercel AI SDK v5.

## Features

- **Native PDF Support**: Uses Claude 3.5 Sonnet's built-in PDF processing capabilities
- **TypeScript**: Fully typed with modern TypeScript
- **Vercel AI SDK v5**: Latest version with native file support
- **Simple Configuration**: Hardcoded PDF path and question for easy testing

## Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```

3. **Add your PDF**:
   - Place your PDF file in the `assets/` directory
   - Update the `PDF_FILEPATH` constant in `src/index.ts` if needed

## Usage

Run the application:

```bash
pnpm start
# or
pnpm dev
```

The application will:
1. Load the PDF file from `assets/Taylor_C602_Instruction_Manual.pdf`
2. Send it to Claude 3.5 Sonnet with the hardcoded question: "the icecream is coming out brown, what do I do?"
3. Display Claude's response in the console

## Configuration

The application uses hardcoded values as specified:

- **PDF_FILEPATH**: `assets/Taylor_C602_Instruction_Manual.pdf`
- **QUESTION**: `"the icecream is coming out brown, what do I do?"`

To change these, edit the constants in `src/index.ts`.

## Requirements

- Node.js 18+
- pnpm
- Anthropic API key
- PDF file in the assets directory

## Note on Large PDFs

If you encounter rate limiting errors with large PDFs (like the 4.26MB Taylor manual), this is due to Anthropic's usage acceleration limits for new accounts. The application code is working correctly - you may need to:

1. Wait a few minutes for rate limits to reset
2. Use a smaller PDF for initial testing
3. Contact Anthropic support to increase your acceleration limits for large documents

## Dependencies

- `@ai-sdk/anthropic`: Anthropic provider for AI SDK
- `ai`: Vercel AI SDK v5
- `tsx`: TypeScript execution
- `typescript`: TypeScript compiler
