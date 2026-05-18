import SectionTitle from "../ui/SectionTitle";
import TutorCard from "./TutorCard";

const tutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Mathematics",
    experience: "5 Years Experience",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },

  {
    id: 2,
    name: "David Smith",
    subject: "Physics",
    experience: "7 Years Experience",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 3,
    name: "Emily Brown",
    subject: "Chemistry",
    experience: "4 Years Experience",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
  id: 4,
  name: "Michael Lee",
  subject: "Biology",
  experience: "6 Years Experience",
  price: 28,
  image: "/default-tutor.png",
},

{
  id: 5,
  name: "Sophia Taylor",
  subject: "English",
  experience: "3 Years Experience",
  price: 20,
  image: "/default-tutor.png",
},

{
  id: 6,
  name: "James Wilson",
  subject: "ICT",
  experience: "8 Years Experience",
  price: 35,
  image: "/default-tutor.png",
},
];

export default function FeaturedTutors() {
  return (
    <section className="bg-white py-24">
      <div className="container-width">
        
        <SectionTitle
          badge="Featured Tutors"
          title="Meet Our Professional Tutors"
          description="Connect with experienced and verified tutors for personalized online and offline learning sessions."
        />

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}