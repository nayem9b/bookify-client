
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const ViewSubscription = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center px-4">
        <BookOpen className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to BookVault
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover sustainable reading through our book reselling platform
        </p>
        <Link to="/subscription">
          <button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            View Subscriptions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewSubscription;
