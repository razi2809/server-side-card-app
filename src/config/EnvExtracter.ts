import { config } from "dotenv";
const configEnv = () => {
  config({
    path: `src/config/.env`,
  });
  const Mode = process.env.MODE;

  config({
    path: `src/config/${Mode}.env`,
  });
  console.log(`app is ruuning in ${Mode} mode`);
  
};
export { configEnv };
