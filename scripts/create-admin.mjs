
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../.env.local');

try {
    if (fs.existsSync(envPath)) {
        console.log(`Loading env from ${envPath}`);
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
            }
        });
    } else {
        console.warn('.env.local file not found!');
    }
} catch (e) {
    console.error('Error loading .env.local', e);
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://prohitpatel012_db_user:fq1y8VqEWHAZ1sxW@cluster0.uftbisu.mongodb.net/pro-animix-ui?appName=Cluster0';

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    plan: { type: String, default: 'basic' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@proanimix.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 12);

        let user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            user.plan = 'premium'; // Admins get premium by default
            user.password = hashedPassword; // Reset password just in case
            await user.save();
            console.log('Existing user updated to Admin.');
        } else {
            user = await User.create({
                name: 'Super Admin',
                email,
                password: hashedPassword,
                role: 'admin',
                plan: 'premium'
            });
            console.log('New Admin user created.');
        }

        console.log(`\nAdmin Credentials:\nEmail: ${email}\nPassword: ${password}\n`);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

createAdmin();
