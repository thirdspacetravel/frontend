import { useParams } from "react-router";
import BookingCard from "../../components/cards/BookingCard";
import QuickFacts from "../../components/cards/QuickFactsCard";
import TripDetails from "../../components/trip/TripDetails";
import { trpc } from "../../trpc";

const Trip = () => {
  const { tripId } = useParams<{ tripId: string }>();
  console.log("Current ID from URL:", tripId); // Check this in browser console
  const {
    data: trip,
    isLoading,
    error,
  } = trpc.public.fetchTripById.useQuery(
    { id: tripId! },
    {
      enabled: !!tripId,
      staleTime: 0,
      select: (data) => ({
        ...data,
        startDateTime: data.startDateTime ? new Date(data.startDateTime) : null,
        endDateTime: data.endDateTime ? new Date(data.endDateTime) : null,
      }),
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !trip) return <div>Trip not found. {tripId}</div>;

  return (
    <>
      <BookingCard trip={trip} />
      <QuickFacts />
      <TripDetails trip={trip} />
    </>
  );
};

export default Trip;
