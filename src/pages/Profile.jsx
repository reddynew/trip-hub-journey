
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          
          {user ? (
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
          ) : (
            <p>Please sign in to view your profile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
