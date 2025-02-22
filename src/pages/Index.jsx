
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Hotel, Tent } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-32 pb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book hotels and amusement parks for unforgettable experiences. Start your journey today.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/hotels">
                <Button size="lg" className="group">
                  Find Hotels
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/amusement-parks">
                <Button size="lg" variant="outline" className="group">
                  Explore Parks
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-xl p-6 transition-all hover:scale-105"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const features = [
  {
    title: "Luxury Hotels",
    description: "Find and book the perfect stay from our curated selection of premium hotels.",
    icon: Hotel,
  },
  {
    title: "Thrilling Parks",
    description: "Discover exciting amusement parks for unforgettable adventures.",
    icon: Tent,
  },
  {
    title: "Smart Booking",
    description: "Easy and secure booking process with instant confirmation.",
    icon: Search,
  },
];

export default Index;
