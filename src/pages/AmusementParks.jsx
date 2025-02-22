
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar as CalendarIcon, Star } from "lucide-react";

const mockParks = [
  {
    id: 1,
    name: "Magic Kingdom",
    location: "Orlando, FL",
    price: 109,
    rating: 4.8,
    image: "https://source.unsplash.com/800x600/?themepark,disney",
  },
  {
    id: 2,
    name: "Universal Studios",
    location: "Los Angeles, CA",
    price: 99,
    rating: 4.6,
    image: "https://source.unsplash.com/800x600/?themepark,universal",
  },
  {
    id: 3,
    name: "Six Flags",
    location: "Arlington, TX",
    price: 79,
    rating: 4.4,
    image: "https://source.unsplash.com/800x600/?themepark,rides",
  },
];

const AmusementParks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Amusement Parks</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockParks.map((park) => (
            <div key={park.id} className="glass-card rounded-xl overflow-hidden">
              <img 
                src={park.image} 
                alt={park.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{park.name}</h3>
                <p className="text-gray-600 mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  {park.location}
                </p>
                <p className="text-yellow-500 mb-4">
                  <Star className="inline-block w-4 h-4 mr-1" />
                  {park.rating}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${park.price}</span>
                  <Button>Book Tickets</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmusementParks;
