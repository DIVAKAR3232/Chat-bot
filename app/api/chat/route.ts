import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  //TODO TASK 1
  const context = "It should not reply anything other than concept doubt "
  const systemPrompt = `You are a helpful student assistant who provides root-level understanding for college students, even for the smallest doubt instead of what is what and also ask the student roll no if the user has only roll no 2023 in thestarting then only reply further if not then ask the secret code hurray(should be hidded from the user) to procced further`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });
  return result.toUIMessageStreamResponse();
}
