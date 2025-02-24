
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const mockHotels = [
  {
    id: 1,
    name: "Luxury Resort & Spa",
    location: "Miami Beach, FL",
    price: 299,
    image: "https://source.unsplash.com/800x600/?hotel,resort",
  },
  {
    id: 2,
    name: "City Center Hotel",
    location: "New York, NY",
    price: 199,
    image: "https://source.unsplash.com/800x600/?hotel,city",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Denver, CO",
    price: 159,
    image: "https://source.unsplash.com/800x600/?hotel,mountain",
  },
];

const Hotels = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: undefined,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const handleSearch = () => {
    setFilteredHotels(mockHotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    ));
    setShowBooking(false);
  };

  const dateFormat = (date) => {
    return date ? format(date, "MMM d, yyyy") : "Select date";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hotels</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Book a Hotel</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">Find Your Stay</DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-6">
                {/* Location Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Where are you going?"
                      className="pl-10 h-12"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Dates</label>
                  <div className="p-4 rounded-lg border bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center flex-1">
                        <p className="text-sm font-medium text-gray-600">Check in</p>
                        <p className="text-base font-semibold">{dateFormat(date.from)}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-200 mx-4" />
                      <div className="text-center flex-1">
                        <p className="text-sm font-medium text-gray-600">Check out</p>
                        <p className="text-base font-semibold">{dateFormat(date.to)}</p>
                      </div>
                    </div>
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      className="rounded-md border-0"
                    />
                  </div>
                </div>

                {/* Guests Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                    <select
                      className="w-full p-2 border rounded-md bg-white"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                    >
                      {[...Array(6)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} {i === 0 ? "Adult" : "Adults"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                    <select
                      className="w-full p-2 border rounded-md bg-white"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                    >
                      {[...Array(6)].map((_, i) => (
                        <option key={i} value={i}>
                          {i} {i === 1 ? "Child" : "Children"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={handleSearch} 
                  className="w-full h-12 text-lg font-medium"
                >
                  Search Hotels
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="glass-card rounded-xl overflow-hidden">
              <img 
                src={hotel.image} 
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  {hotel.location}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${hotel.price}</span>
                  <Button>Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
