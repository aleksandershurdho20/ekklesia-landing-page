"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  CreditCard,
  MessageCircle,
  Video,
  Globe,
  Layers,
  Menu,
  X,
  FileText,
  BarChart,
  Shield,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const MotionLink = motion(Link);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["home", "features", "testimonials", "pricing"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const FeatureCard = ({
    feature,
    index,
  }: {
    feature: {
      description: string;
      icon: LucideIcon;
      title: string;
    };
    index: number;
  }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.1 },
          },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        <Card className="h-full bg-[#fbf8fa] hover:shadow-lg transition-shadow duration-300 border-2 border-[#302f2e]">
          <CardHeader>
            <feature.icon className="h-8 w-8 mb-2 text-[#302f2e]" />
            <CardTitle className="text-xl font-semibold text-[#302f2e]">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#302f2e]">{feature.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // const TestimonialCard = ({ testimonial, index }) => {
  //   const controls = useAnimation()
  //   const [ref, inView] = useInView({
  //     triggerOnce: true,
  //     threshold: 0.1,
  //   })

  //   useEffect(() => {
  //     if (inView) {
  //       controls.start("visible")
  //     }
  //   }, [controls, inView])

  //   return (
  //     <motion.div
  //       ref={ref}
  //       animate={controls}
  //       initial="hidden"
  //       variants={{
  //         visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  //         hidden: { opacity: 0, y: 50 }
  //       }}
  //     >
  //       <Card className="bg-[#fbf8fa] hover:shadow-lg transition-shadow duration-300 border-2 border-[#302f2e]">
  //         <CardHeader>
  //           <CardTitle className="text-xl font-semibold text-[#302f2e]">{testimonial.church}</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="text-[#302f2e]/80 italic">&ldquo;{testimonial.quote}&rdquo;</p>
  //         </CardContent>
  //       </Card>
  //     </motion.div>
  //   )
  // }

  return (
    <>
      <Global styles={globalStyles} />
      <div className="flex flex-col min-h-screen bg-[#fbf8fa] text-[#302f2e]">
        <header
          className={`px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 transition-colors duration-300 ${
            scrollY > 50 ? "bg-[#fbf8fa]/80 backdrop-blur-md shadow-md" : ""
          }`}
        >
          <Link className="flex items-center justify-center" href="#home">
            <Layers className="h-6 w-6 text-[#302f2e]" />
            <span className="ml-2 text-xl font-bold text-[#302f2e]">
              Ekklesia
            </span>
          </Link>
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-4"
            >
              {navItems.map((item) => (
                <MotionLink
                  key={item.name}
                  variants={itemVariants}
                  className={`text-sm font-medium hover:text-[#302f2e]/70 transition-colors ${
                    activeSection === item.name.toLowerCase()
                      ? "text-[#302f2e]"
                      : "text-[#302f2e]/80"
                  }`}
                  href={item.href}
                >
                  {item.name}
                </MotionLink>
              ))}
            </motion.div>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </header>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#fbf8fa] pt-16"
          >
            <nav className="flex flex-col items-center gap-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  className={`text-lg font-medium hover:text-[#302f2e]/70 transition-colors ${
                    activeSection === item.name.toLowerCase()
                      ? "text-[#302f2e]"
                      : "text-[#302f2e]/80"
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
        <main className="flex-1 pt-16">
          <section
            id="home"
            className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
          >
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Empower Your Church with Ekklesia
                  </h1>
                  <p className="mx-auto max-w-[700px] text-[#302f2e]/80 md:text-xl">
                    The all-in-one SaaS solution for modern churches. Manage
                    members, events, donations, and more with ease.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="bg-[#302f2e] hover:bg-[#302f2e]/90 text-[#fbf8fa]">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#302f2e] text-[#302f2e] hover:bg-[#302f2e]/10"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-[#302f2e]"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#fbf8fa]">
                Core Features
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Users,
                    title: "Member Management",
                    description:
                      "Manage profiles, track attendance, and organize groups effortlessly.",
                  },
                  {
                    icon: Calendar,
                    title: "Event Management",
                    description:
                      "Schedule events, coordinate volunteers, and manage RSVPs seamlessly.",
                  },
                  {
                    icon: CreditCard,
                    title: "Donations & Payments",
                    description:
                      "Process online donations, manage pledges, and generate financial reports.",
                  },
                  {
                    icon: MessageCircle,
                    title: "Communication Tools",
                    description:
                      "Send announcements, newsletters, and facilitate group chats easily.",
                  },
                  {
                    icon: Video,
                    title: "Sermon Management",
                    description:
                      "Stream live services, archive media, and share devotionals effortlessly.",
                  },
                  {
                    icon: Globe,
                    title: "Custom Microsites",
                    description:
                      "Create branded websites for individual churches with customizable themes.",
                  },
                  {
                    icon: FileText,
                    title: "Custom Web Forms",
                    description:
                      "Create and manage custom forms for registrations, surveys, and data collection.",
                  },
                  {
                    icon: BarChart,
                    title: "Analytics Dashboard",
                    description:
                      "Gain insights into church growth, engagement, and financial trends.",
                  },
                  {
                    icon: Shield,
                    title: "Security & Compliance",
                    description:
                      "Ensure data protection and maintain compliance with privacy regulations.",
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile App Integration",
                    description:
                      "Extend church connectivity with a custom mobile app for members.",
                  },
                ].map((feature, index) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#302f2e]">
                What Churches Say
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    church: "First Baptist Church",
                    quote:
                      "Ekklesia has revolutionized how we manage our congregation. It's user-friendly and comprehensive!",
                  },
                  {
                    church: "Grace Community Church",
                    quote:
                      "The event management feature has made coordinating our activities so much easier. Highly recommended!",
                  },
                  {
                    church: "St. Mary's Catholic Church",
                    quote:
                      "We've seen a significant increase in online donations since using Ekklesia. It's been a game-changer!",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.church}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 20 },
                    }}
                  >
                    <Card className="bg-[#fbf8fa] hover:shadow-lg transition-shadow duration-300 border-2 border-[#302f2e]">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-[#302f2e]">
                          {testimonial.church}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#302f2e]/80 italic">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-[#302f2e]"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#fbf8fa]">
                Pricing Plans
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Basic",
                    price: "$49/mo",
                    features: [
                      "Up to 200 members",
                      "Core features included",
                      "Email support",
                    ],
                  },
                  {
                    title: "Pro",
                    price: "$99/mo",
                    features: [
                      "Up to 1000 members",
                      "All features included",
                      "Priority support",
                    ],
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    features: [
                      "Unlimited members",
                      "Custom features",
                      "24/7 support",
                    ],
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={plan.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 20 },
                    }}
                  >
                    <Card className="bg-[#fbf8fa] hover:shadow-xl transition-shadow duration-300 border-2 border-[#302f2e]">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#302f2e]">
                          {plan.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold mb-4 text-[#302f2e]">
                          {plan.price}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center text-[#302f2e]/80"
                            >
                              <svg
                                className="w-4 h-4 mr-2 text-[#302f2e]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-[#302f2e] hover:bg-[#302f2e]/90 text-[#fbf8fa]">
                          {plan.title === "Enterprise"
                            ? "Contact Us"
                            : "Get Started"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full py-6 bg-[#fbf8fa] border-t border-[#302f2e]">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#302f2e]/80">
              © 2024 Ekklesia. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link
                className="text-sm text-[#302f2e]/80 hover:text-[#302f2e] transition-colors"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm text-[#302f2e]/80 hover:text-[#302f2e] transition-colors"
                href="#"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
