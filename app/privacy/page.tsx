export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="lead text-xl text-muted-foreground mb-8">
                We value your trust and are committed to protecting your personal information.
            </p>

            <section className="mb-8">
                <h2>1. Information We Collect</h2>
                <p>
                    We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include:
                </p>
                <ul>
                    <li>Name and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Vehicle/Boat information for fitment verification</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2>2. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Process your orders and manage your account.</li>
                    <li>Send you technical notices, updates, security alerts, and support messages.</li>
                    <li>Verify product fitment to prevent returns.</li>
                    <li>Analyze trends and usage to improve our website.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2>3. Data Security</h2>
                <p>
                    We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
                </p>
            </section>

            <section className="mb-8">
                <h2>4. Cookies</h2>
                <p>
                    We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.
                </p>
            </section>
        </div>
    )
}
