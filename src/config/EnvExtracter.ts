import { config } from "dotenv";
const configEnv = () => {
  config({
    path: `src/config/.env`,
  });
  const Mode = process.env.MODE;

  config({
    path: `src/config/${Mode}.env`,
  });
};
export { configEnv };
