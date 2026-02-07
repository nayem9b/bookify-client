import React from "react";
import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./CardSubscription";
import { Check, BookOpen, Sparkles, Crown, ArrowRight, Star, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto text-center max-w-6xl">
            <div className="text-left mb-8">
              <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/subscription', label: 'Subscription' }]} />
            </div>
            
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Premium Subscription Plans</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Choose Your Reading Journey
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock a world of pre-loved books with flexible subscription plans designed for every reader.
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-500 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join thousands of readers discovering sustainable, affordable reading experiences.
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500 ${
                    plan.popular ? 'opacity-10' : ''
                  }`}></div>
                  
                  <Card 
                    className={`relative transition-all duration-500 hover:shadow-2xl ${
                      plan.popular 
                        ? "border-indigo-500 shadow-2xl scale-105 md:scale-110 bg-gradient-to-br from-indigo-50 to-purple-50" 
                        : "border-gray-200 bg-white/80 backdrop-blur-sm"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-br from-slate-800 to-blue-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8 pt-12">
                      <div className={`mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${
                        plan.popular 
                          ? 'from-indigo-500 to-purple-500' 
                          : 'from-gray-500 to-gray-600'
                      } flex items-center justify-center shadow-lg`}>
                        <plan.icon className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-3xl mb-3 font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">{plan.description}</CardDescription>
                      <div className="mt-6">
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500 text-lg">{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6">
                      <ul className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="pt-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full"
                      >
                        <Button 
                          className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                            plan.popular 
                              ? "bg-gradient-to-br from-slate-800 to-blue-900 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl" 
                              : "bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
                          }`}
                          size="lg"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about our subscription plans and services.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-900 -skew-y-3 transform origin-top-left"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Start Your Reading Adventure Today
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                  Join our community of book lovers and discover your next favorite read with our flexible subscription plans.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                  >
                    Try Free for 14 Days
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    View All Plans
                  </motion.button>
                </div>
                <div className="flex items-center justify-center gap-6 text-indigo-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subscription;
