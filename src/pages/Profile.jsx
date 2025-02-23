
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

const mockBookings = [
  {
    id: 1,
    type: "Hotel",
    name: "Luxury Resort & Spa",
    location: "Miami Beach, FL",
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
    price: 299,
  },
  {
    id: 2,
    type: "Amusement Park",
    name: "Magic Kingdom",
    location: "Orlando, FL",
    date: "2024-04-15",
    price: 109,
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy');
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Profile Information */}
          <div className="glass-card rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p className="text-lg">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <Button onClick={logout} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
            
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{booking.name}</h3>
                    <span className="text-primary font-bold">${booking.price}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">
                    <MapPin className="inline-block w-4 h-4 mr-1" />
                    {booking.location}
                  </p>
                  
                  <p className="text-gray-600">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    {booking.type === "Hotel" ? (
                      <span>
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                    ) : (
                      <span>{formatDate(booking.date)}</span>
                    )}
                  </p>
                  
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-sm bg-gray-100 rounded">
                      {booking.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
