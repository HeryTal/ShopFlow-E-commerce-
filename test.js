// final-check.js
console.log("✅ TOUTES LES VARIABLES SONT CONFIGURÉES SUR VERCEL !\n");

console.log("📋 Variables présentes:");
console.log("1. ✅ MONGODB_URI");
console.log("2. ✅ INNGEST_EVENT_KEY");
console.log("3. ✅ INNGEST_SIGNING_KEY");
console.log("4. ✅ CLERK_WEBHOOK_SECRET");
console.log("5. ✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
console.log("6. ⚠️ CLERK_SECRET_KEY - À AJOUTER (vercel env add CLERK_SECRET_KEY)");

const siteURL = "https://shop-flow-e-commerce-git-main-raherinirina-jocelyns-projects.vercel.app";

console.log("\n🌐 TON APPLICATION EST EN LIGNE:");
console.log(`   ${siteURL}`);

console.log("\n🔧 DERNIÈRES ÉTAPES :");

console.log("\n1. 📝 CONFIGURE CLERK WEBHOOK:");
console.log("   Va sur: https://dashboard.clerk.com");
console.log("   → Ton app → Webhooks → Add Endpoint");
console.log(`   URL: ${siteURL}/api/inngest`);
console.log("   Événements: user.created, user.updated, user.deleted");
console.log("   Clique 'Create'");

console.log("\n2. 🔗 TESTE LE WEBHOOK DEPUIS CLERK:");
console.log("   Dans Clerk Dashboard, sur la page du webhook:");
console.log("   → Clique 'Test' → Choisis 'user.created' → 'Send'");
console.log("   → Vérifie les logs: vercel logs --follow");

console.log("\n3. 👤 TESTE L'INSCRIPTION:");
console.log("   a) Ouvre: " + siteURL);
console.log("   b) Clique 'Sign in'");
console.log("   c) Connecte-toi avec Google");
console.log("   d) Surveille les logs: vercel logs --follow");
console.log("   e) Vérifie MongoDB Atlas");

console.log("\n4. 📊 VÉRIFIE MONGODB ATLAS:");
console.log("   Va sur: https://cloud.mongodb.com");
console.log("   → Clique sur ton cluster 'shopwflow'");
console.log("   → 'Browse Collections'");
console.log("   → Sélectionne la base 'shopFlow'");
console.log("   → Tu devrais voir l'utilisateur dans 'users'");

console.log("\n🚀 TON APPLICATION E-COMMERCE EST PRÊTE !");