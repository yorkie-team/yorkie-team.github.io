import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables with proper precedence:
// 1. Command line variables (highest priority - already in process.env)
// 2. Environment-specific file based on NODE_ENV
// 3. .env (base defaults - lowest priority)

const nodeEnv = process.env.NODE_ENV || 'development';

// Load environment-specific file first (higher priority)
if (nodeEnv === 'production') {
  dotenv.config({ path: '.env.production', override: false });
}

// Load base .env file last (lower priority)
dotenv.config({ path: '.env', override: false });

const YORKIE_SDK_PATH = path.join(process.cwd(), 'temp');
const EXAMPLES_OUTPUT_PATH = path.join(process.cwd(), 'public/apps');

const STATIC_EXAMPLES = [
  'vanilla-quill',
  'nextjs-scheduler',
  'nextjs-todolist',
  'profile-stack',
  'simultaneous-cursors',
  'vuejs-kanban',
  'react-todomvc',
  'react-flow',
  'vanilla-codemirror6',
  'react-tldraw',
];

const createEnvFile = (sdkPath: string) => {
  const apiAddr = process.env.NEXT_PUBLIC_API_ADDR || 'https://api.yorkie.dev';
  const apiKey = process.env.NEXT_PUBLIC_EXAMPLES_API_KEY || '';

  const envContent = `VITE_YORKIE_API_ADDR='${apiAddr}'
VITE_YORKIE_API_KEY='${apiKey}'
NEXT_PUBLIC_YORKIE_API_ADDR='${apiAddr}'
NEXT_PUBLIC_YORKIE_API_KEY='${apiKey}'
`;

  // Create .env.production in yorkie-js-sdk root for all examples
  fs.writeFileSync(path.join(sdkPath, '.env.production'), envContent);
  console.log(`✅ Created .env.production in ${sdkPath}`);
};

const copyBuiltExamples = () => {
  console.log('\n📋 Copying built examples to public/apps...');

  for (const exampleName of STATIC_EXAMPLES) {
    const sourcePath = path.join(YORKIE_SDK_PATH, 'examples', exampleName, 'dist');
    const targetPath = path.join(EXAMPLES_OUTPUT_PATH, exampleName);

    if (fs.existsSync(sourcePath)) {
      fs.mkdirSync(targetPath, { recursive: true });
      fs.cpSync(sourcePath, targetPath, { recursive: true });
      console.log(`✅ Copied ${exampleName} → ${targetPath}`);
    } else {
      console.log(`⚠️  ${exampleName} build output not found at ${sourcePath}`);
    }
  }
};

const buildAllExamples = async () => {
  console.log('🚀 Starting to build examples using yorkie-js-sdk...\n');
  console.log(`Using API Address: ${process.env.NEXT_PUBLIC_API_ADDR || 'https://api.yorkie.dev'}`);
  console.log(`Using API Key: ${process.env.NEXT_PUBLIC_EXAMPLES_API_KEY ? '***' : '(none)'}\n`);

  try {
    // Check if yorkie-js-sdk exists
    if (!fs.existsSync(YORKIE_SDK_PATH)) {
      console.error('❌ yorkie-js-sdk not found. Please run "npm run fetch:examples" first.');
      process.exit(1);
    }

    // Create .env.production file
    createEnvFile(YORKIE_SDK_PATH);

    // Install dependencies if needed
    if (!fs.existsSync(path.join(YORKIE_SDK_PATH, 'node_modules'))) {
      console.log('📥 Installing dependencies...');
      // Use --prod=false to install devDependencies even when NODE_ENV=production
      // This is needed because prepare scripts may require dev dependencies (e.g., husky)
      execSync('pnpm install --prod=false', { cwd: YORKIE_SDK_PATH, stdio: 'inherit' });
    }

    // Build examples using pnpm
    console.log('\n🔨 Building examples...');
    for (const name of STATIC_EXAMPLES) {
      console.log(`\n--- Building example: ${name} ---`);

      // Set NEXT_PUBLIC_BASE_PATH for Next.js examples
      const buildEnv: NodeJS.ProcessEnv = {
        ...process.env,
        NODE_ENV: 'production',
      };

      createEnvFile(`${YORKIE_SDK_PATH}/examples/${name}`);

      if (name.startsWith('nextjs-')) {
        buildEnv.NEXT_PUBLIC_BASE_PATH = `/apps/${name}`;
        console.log(`Setting NEXT_PUBLIC_BASE_PATH=${buildEnv.NEXT_PUBLIC_BASE_PATH}`);
      }

      execSync(`pnpm ${name} build`, {
        cwd: YORKIE_SDK_PATH,
        stdio: 'inherit',
        env: buildEnv,
      });
    }

    // Ensure output directory exists
    fs.mkdirSync(EXAMPLES_OUTPUT_PATH, { recursive: true });

    // Copy built examples
    copyBuiltExamples();

    console.log('\n✨ All examples built successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    throw error;
  }
};

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAllExamples().catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

export { buildAllExamples };
