import { createMcpHandler } from "@vercel/mcp-adapter";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";
import {
  echoTool,
  logExpenseTool,
  getExpensesTool,
  userSetupTool,
} from "../../tools";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      echoTool.name,
      echoTool.description,
      echoTool.schema,
      echoTool.handler
    );

    server.tool(
      logExpenseTool.name,
      logExpenseTool.description,
      logExpenseTool.schema,
      logExpenseTool.handler
    );

    server.tool(
      getExpensesTool.name,
      getExpensesTool.description,
      getExpensesTool.schema,
      getExpensesTool.handler
    );

    server.tool(
      userSetupTool.name,
      userSetupTool.description,
      userSetupTool.schema,
      userSetupTool.handler
    );
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    ...(isRedisAvailable() && { redisUrl: getRedisUrl() }),
  }
);

export { handler as GET, handler as POST, handler as DELETE };
