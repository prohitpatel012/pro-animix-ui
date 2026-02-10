
import { randomBytes } from 'crypto';

const BASE_URL = 'http://localhost:3000/api/auth';
const ADMIN_BASE_URL = 'http://localhost:3000/api/admin';

async function runAdminTests() {

    // --- Create Test User ---
    const testEmail = `testuser_${randomBytes(4).toString('hex')}@example.com`;
    const checkEmail = `admin@proanimix.com`; // The admin we just created
    console.log(`\n--- Starting Admin Capabilities Tests ---`);
    console.log(`Test User for updates: ${testEmail}`);

    // 1. Create a potential admin target
    const registerRes = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Target User',
            email: testEmail,
            password: 'password123',
            role: 'user', // Starts as normal user
        }),
    });
    const registerData = await registerRes.json();
    if (!registerRes.ok) {
        console.error('Registration failed:', registerData);
        process.exit(1);
    }
    const testUserId = registerData.user._id;
    console.log(`Registered user for test: ${testEmail} (ID: ${testUserId})`);

    // 2. Login as Normal User
    console.log(`\nTest Case 1: Standard User Access attempts`);
    const loginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: 'password123' }),
    });
    const userCookie = loginRes.headers.get('set-cookie');

    // 3. Attempt Admin Action as User (Should Fail)
    const failRes = await fetch(`${ADMIN_BASE_URL}/users`, {
        headers: { Cookie: userCookie },
    });
    if (failRes.status === 403) {
        console.log(`✓ Access correctly denied for standard user (Status: 403)`);
    } else {
        console.error(`ERROR: Standard user accessed admin endpoint! Status: ${failRes.status}`);
        process.exit(1);
    }

    // 4. Login as Admin
    console.log(`\nTest Case 2: Admin Valid Operations`);
    const adminLoginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@proanimix.com', password: 'admin123' }),
    });

    if (!adminLoginRes.ok) {
        console.error('Admin Login failed. Make sure you ran the create-admin script first.');
        process.exit(1);
    }

    const adminCookie = adminLoginRes.headers.get('set-cookie');
    console.log(`✓ Admin logged in successfully`);

    // 5. Get Users List as Admin (Should Succeed)
    const listRes = await fetch(`${ADMIN_BASE_URL}/users`, {
        headers: { Cookie: adminCookie },
    });

    if (listRes.ok) {
        const listData = await listRes.json();
        console.log(`✓ Admin fetched users list. Count: ${listData.users.length}`);
    } else {
        console.error(`ERROR: Admin failed to fetch user list. Status: ${listRes.status}`);
    }

    // 6. Update User Role as Admin (Should Succeed)
    console.log(`\nTest Case 3: Admin Privilege Escalation (Changing User -> Moderator)`);
    const updateRes = await fetch(`${ADMIN_BASE_URL}/users/${testUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Cookie: adminCookie
        },
        body: JSON.stringify({ role: 'moderator', plan: 'pro' })
    });

    if (updateRes.ok) {
        const updateData = await updateRes.json();
        if (updateData.user.role === 'moderator' && updateData.user.plan === 'pro') {
            console.log(`✓ Admin successfully updated user role to 'moderator' and plan to 'pro'`);
        } else {
            console.error(`ERROR: Update succeeded but data invalid:`, updateData);
        }
    } else {
        console.error(`ERROR: Admin update call failed. Status: ${updateRes.status}`);
    }

    console.log(`\n--- All Admin Tests Passed ---`);
}

runAdminTests().catch(console.error);
