
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const handleSearch = () => {
    // In a real app, this would filter based on the API response
    setFilteredHotels(mockHotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    ));
    setShowBooking(false);
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
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book Your Stay</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="location">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Where are you going?"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label>Dates</label>
                  <div className="grid gap-4">
                    <Calendar
                      mode="range"
                      selected={{
                        from: startDate,
                        to: endDate,
                      }}
                      onSelect={(range) => {
                        if (range?.from) setStartDate(range.from);
                        if (range?.to) setEndDate(range.to);
                      }}
                      numberOfMonths={2}
                    />
                  </div>
                </div>
                <Button onClick={handleSearch}>Search</Button>
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
