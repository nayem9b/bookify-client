import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./CardSubscription";
import { Check, BookOpen, Sparkles, Crown } from "lucide-react";
// Link import removed — not needed in this component
import Breadcrumbs from "../Common/Breadcrumbs";

const Subscription = () => {
  const plans = [
    {
      name: "Reader",
      price: "$9.99",
      period: "/month",
      description: "Perfect for casual book lovers",
      icon: BookOpen,
      features: [
        "Access to 500+ books monthly",
        "Unlimited browsing",
        "Basic recommendations",
        "2 books per month",
        "Standard shipping",
        "Email support"
      ],
      popular: false,
      gradient: "from-secondary to-secondary/80"
    },
    {
      name: "Collector",
      price: "$24.99",
      period: "/month",
      description: "For dedicated bibliophiles",
      icon: Sparkles,
      features: [
        "Access to 2000+ books monthly",
        "Priority browsing",
        "AI-powered recommendations",
        "5 books per month",
        "Express shipping",
        "Priority support",
        "Exclusive first editions",
        "Member-only sales"
      ],
      popular: true,
      gradient: "from-primary to-primary/80"
    },
    {
      name: "Bibliophile",
      price: "$49.99",
      period: "/month",
      description: "Ultimate book collecting experience",
      icon: Crown,
      features: [
        "Unlimited book access",
        "VIP browsing experience",
        "Personal book concierge",
        "10 books per month",
        "Free overnight shipping",
        "24/7 premium support",
        "Rare & signed editions",
        "Private collection viewings",
        "Custom book sourcing"
      ],
      popular: false,
      gradient: "from-accent to-accent/80"
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes! You can upgrade or downgrade your subscription at any time. Changes take effect immediately."
    },
    {
      question: "What happens to my books if I cancel?",
      answer: "All books you've purchased remain yours forever. Your subscription benefits will continue until the end of your billing period."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Absolutely! All new members get a 14-day free trial with full access to their chosen plan's features."
    },
    {
      question: "How does book reselling work?",
      answer: "You can list your books for resale on our platform. We handle the transaction and shipping, and you keep 80% of the sale price."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="text-left mb-6">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/subscription', label: 'Subscription' }]} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Reading Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Unlock a world of pre-loved books with flexible subscription plans
          </p>
          <p className="text-lg text-muted-foreground">
            Join thousands of readers discovering sustainable, affordable reading
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.popular 
                    ? "border-primary shadow-xl scale-105 md:scale-110" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? "bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Reading Adventure Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of book lovers and discover your next favorite read
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
            Try Free for 14 Days
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
