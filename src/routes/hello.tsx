import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/store/useAuth";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const Route = createFileRoute("/hello")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;

      if (!user || user.userType !== "seller") {
        throw redirect({ to: "/" });
      }
    }
  },
  component: HelloPage,
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold text-[13px]">
        DC
      </div>
      <span className="font-display text-[18px] tracking-tight">
        DealChain
      </span>
    </div>
  );
}
const heroSlides = [
  {

    title: "Naina Arora requires ₹2.80 Cr property",
    text: "Naina Arora requires ₹2.80 Cr property · Karan Bhatia offering ₹2.20 Cr property56–178 sq yd",
  },
  {
    title: "Rohan Mehta requires ₹7.50 Cr property ",
    text: "Rohan Mehta requires ₹7.50 Cr property · Priya Singh offering ₹6.40 Cr property 350–500 sq yd",
  },
  {
    title: "Naina Arora requires ₹4.20 Cr property ",
    text: "Naina Arora requires ₹4.20 Cr property · Karan Bhatia offering ₹3.80 Cr property 200–300 sq yd",
  },
];

const propertyCards = [
  {
    title: "Premium Builder Floor Requirement",
    area: "Buyer looking in South Delhi",
    image: "/images/property1.jpg",
  },
  {
    title: "Luxury Apartment Inventory",
    area: "Available in Vasant Vihar",
    image: "/images/property2.jpg",
  },
  {
    title: "Independent Floor Opportunity",
    area: "Greater Kailash & nearby areas",
    image: "/images/property3.jpg",
  },
  {
    title: "Farmhouse / Villa Requirement",
    area: "Chattarpur, Westend Greens",
    image: "/images/property4.jpg",
  },
  {
    title: "Investment Property Lead",
    area: "Delhi NCR premium locations",
    image: "/images/property5.jpg",
  },
];

const hotCards = [
  {
    kind: "Hot Requirement",
    title: "Buyer looking for 400 Sq Yard builder floor",
    area: "Saket, Panchsheel, Greater Kailash",
  },
  {
    kind: "Hot Inventory",
    title: "Seller has premium independent floor available",
    area: "Vasant Vihar",
  },
  {
    kind: "Broker Opportunity",
    title: "Active broker seeking matching buyer leads",
    area: "South Delhi",
  },
];

function HelloPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[14px] text-muted-foreground">
            {user?.userType === "seller" && (
              <Link to="/hello" className="hover:text-foreground transition-colors">
                Home
              </Link>
            )}

            <a href="#marketplace" className="hover:text-foreground transition-colors">
              Live marketplace
            </a>

            <a href="#featured" className="hover:text-foreground transition-colors">
              Featured properties
            </a>

            <a href="#network" className="hover:text-foreground transition-colors">
              Network
            </a>
          </nav>
          <Button
            asChild
            className="h-9 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to="/app">
              Dashboard <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="border-b border-border hero-section">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="w-full"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-[680px] flex items-center justify-center text-center overflow-hidden">
                {/* <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                /> */}

                <div className="absolute inset-0 " />

                <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-20 hero-border ">

                  <p className="text-sm uppercase tracking-[0.22em]  mb-5">
                    Trading possibility

                  </p>



                  <h2 className="mt-8 font-display text-[30px] md:text-[46px] ">
                    {slide.title}
                  </h2>

                  <p className="mt-5 text-[17px] md:text-[19px]  max-w-2xl mx-auto">
                    {slide.text}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3 justify-center">
                    <Button
                      asChild
                      className="h-12 px-7 rounded-full bg-white text-black hover:bg-white/90"
                    >
                      <Link to="/app">
                        View Details
                        <ArrowRight className="size-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Live Seller & Buyer */}
      <section id="marketplace" className="py-20 lg:py-24 border-b border-border bg-secondary/30">        <div className=" mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Live marketplace
          </div>

          <h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
            Buyers and sellers moving right now.
          </h2>
        </div>



        <div className="grid md:grid-cols-2 gap-6 pb-10 mt-10">
          <div className="rounded-[28px] overflow-hidden border border-border bg-card">


            <div className="p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground text-center">
                Live sellers
              </div>
              <h3 className="font-display text-[30px] mb-3 text-center">
                980+ active sellers
              </h3>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2800, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Naina Arora

                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹2.00 Cr–₹2.80 Cr · 1300–1700 sqft · urgency 9/10

                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Naina Arora

                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹2.00 Cr–₹2.80 Cr · 1300–1700 sqft · urgency 9/10

                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Vikram Sethi

                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹17.00 Cr–₹19.50 Cr · 6500–7500 sqft · urgency 9/10

                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Priya Singh


                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹6.40 Cr–₹7.00 Cr · 2700–2900 sqft · urgency 7/10


                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Karan Bhatia


                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹2.20 Cr–₹2.60 Cr · 1400–1600 sqft · urgency 7/10


                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live seller
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Rohan Mehta


                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹6.00 Cr–₹7.50 Cr · 2400–3200 sqft · urgency 8/10


                      </p>
                    </div>
                  </div>

                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="rounded-[28px] overflow-hidden border border-border bg-card">


            <div className="p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground text-center">
                Live buyers
              </div>
              <h3 className="font-display text-[30px] mb-3 text-center">
                1,240+ active buyers
              </h3>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2800, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live buyer
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Naina Arora

                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹2.00 Cr–₹2.80 Cr · 1300–1700 sqft · urgency 9/10

                      </p>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live buyer
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Vikram Sethi

                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹2.00 Cr–₹2.80 Cr · 1300–1700 sqft · urgency 9/10

                      </p>
                    </div>
                  </div>

                </SwiperSlide>

                <SwiperSlide>
                  <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">


                    <div className="p-5">
                      <p className="text-xs pb-2 uppercase tracking-[0.18em] text-muted-foreground">
                        Live buyer
                      </p>
                      <h3 className="font-display text-xl leading-tight">
                        Rohan Mehta


                      </h3>

                      <p className="text-muted-foreground mt-2">
                        ₹6.00 Cr–₹7.50 Cr · 2400–3200 sqft · urgency 8/10


                      </p>
                    </div>
                  </div>

                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      </section>



      {/* Featured Properties Slider */}
      <section id="featured" className="py-20 lg:py-24 border-b border-border">        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Featured properties
          </div>

          <h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
            Premium listings from the network.
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {propertyCards.map((property, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-[24px] overflow-hidden border border-border bg-card hover:border-foreground/30 transition-colors">
                {/* <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-[260px] object-cover"
                  /> */}

                <div className="p-5">
                  <h3 className="font-display text-xl leading-tight">
                    {property.title}
                  </h3>

                  <p className="text-muted-foreground mt-2">
                    {property.area}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </section>

      {/* Trust & Scale */}
      <section id="network" className="border-b border-border bg-secondary/40">        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-10">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Live across the network
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { k: "1,240+", v: "Active buyers" },
            { k: "980+", v: "Active sellers" },
            { k: "5,400+", v: "Active brokers" },
            { k: "3,200+", v: "Active properties" },
            { k: "184", v: "Deals in progress" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border bg-background p-5 text-center"
            >
              <div className="font-display text-[26px] md:text-[30px] tracking-tight">
                {s.k}
              </div>

              <div className="text-[12px] text-muted-foreground mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>





      {/* Dark Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-[10px] bg-white text-black grid place-items-center font-display font-semibold text-[13px]">
                  DC
                </div>

                <span className="font-display text-[20px] tracking-tight">
                  DealChain
                </span>
              </div>

              <p className="text-white/55 mt-5 leading-relaxed">
                A private property network built for serious buyers, sellers,
                and brokers.
              </p>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Platform</h4>

              <ul className="space-y-3 text-white/55 text-sm">
                <li>Dashboard</li>
                <li>Inventory</li>
                <li>Requirements</li>
                <li>Matches</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Company</h4>

              <ul className="space-y-3 text-white/55 text-sm">
                <li>About</li>
                <li>How it works</li>
                <li>Live opportunities</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Contact</h4>

              <ul className="space-y-3 text-white/55 text-sm">
                <li>Delhi NCR, India</li>
                <li>info@dealchain.com</li>
                <li>+91 99999 99999</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-7 flex flex-wrap items-center justify-between gap-4 text-sm text-white/45">
            <p>© {new Date().getFullYear()} DealChain. All rights reserved.</p>

            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}