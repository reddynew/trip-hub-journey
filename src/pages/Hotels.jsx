
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
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Book Your Stay</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-lg font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Where are you going?"
                      className="pl-10 h-12 text-lg"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-lg font-medium">Dates</label>
                  <div className="p-4 rounded-lg border bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 py-2 mb-4 bg-gray-50 rounded-lg">
                      <div className="text-center flex-1">
                        <p className="font-medium text-gray-600">Check in</p>
                        <p className="text-lg font-semibold">{dateFormat(date.from)}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300 mx-4" />
                      <div className="text-center flex-1">
                        <p className="font-medium text-gray-600">Check out</p>
                        <p className="text-lg font-semibold">{dateFormat(date.to)}</p>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        className="flex bg-white p-0 justify-center [&_.rdp-nav]:hidden [&_.rdp-caption]:text-lg [&_.rdp-cell]:text-center [&_.rdp-head_th]:font-medium"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSearch} 
                  className="w-full h-12 text-lg font-medium mt-2"
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
