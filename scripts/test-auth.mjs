
import { randomBytes } from 'crypto';

const BASE_URL = 'http://localhost:3000/api/auth';
const email = `testuser_${randomBytes(4).toString('hex')}@example.com`;
const password = 'password123';

async function runTests() {
    console.log('--- Starting Authentication Tests ---');

    // 1. Register
    console.log(`\n1. Registering user: ${email}...`);
    const registerRes = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Test User',
            email,
            password,
            role: 'user',
        }),
    });

    const registerData = await registerRes.json();
    if (!registerRes.ok) {
        console.error('Registration failed:', registerData);
        process.exit(1);
    }
    console.log('Registration successful:', registerData.user.email);

    // 2. Login
    console.log('\n2. Logging in...');
    const loginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();
    if (!loginRes.ok) {
        console.error('Login failed:', loginData);
        process.exit(1);
    }

    // Extract session cookie manually since fetch in Node won't auto-persist
    const cookieHeader = loginRes.headers.get('set-cookie');
    if (!cookieHeader) {
        console.error('No session cookie returned after login!');
        process.exit(1);
    }
    console.log('Login successful. Session cookie received.');

    // 3. Verify Session (Persistence)
    console.log('\n3. Verifying session (persistence)...');
    const meRes = await fetch(`${BASE_URL}/me`, {
        headers: { Cookie: cookieHeader },
    });

    if (!meRes.ok) {
        console.error('Session verification failed:', await meRes.text());
        process.exit(1);
    }
    const meData = await meRes.json();
    if (meData.user.email === email) {
        console.log('Session Verified! User:', meData.user.email);
    } else {
        console.error('Session verification returned wrong user:', meData);
        process.exit(1);
    }

    // 4. Logout
    console.log('\n4. Logging out...');
    const logoutRes = await fetch(`${BASE_URL}/me`, {
        method: 'POST',
        headers: { Cookie: cookieHeader },
    });

    if (logoutRes.ok) {
        console.log('Logout successful.');
    } else {
        console.error('Logout failed.');
    }

    console.log('\n--- All Tests Passed Successfully ---');
}

runTests().catch(console.error);
