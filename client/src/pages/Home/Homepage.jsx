import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

// ── Static Data ────────────────────────────────────────────────────────────────
const ARTICLES = [
    {
        _id: "679824c785768d12b56f24b7",
        title: "Artificial Intelligence in Healthcare",
        publisher: { publisherName: "NextGen Media" },
        tags: ["health", "science", "technology"],
        description:
            "Artificial intelligence is transforming the healthcare sector, enabling faster diagnoses, personalized treatments, and improved patient outcomes.",
        isPremium: true,
        image: "https://i.ibb.co.com/4ZGzjSDL/Artificial-Intelligence-in-Healthcare.webp",
        author: { name: "Miftahul Jannat", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_6sRWu58khXTWnjB1az_PoZWOWBFF6AGhi3ILCu6MVDgZ0A=s96-c" },
        viewCount: 73,
        createdAt: "2025-01-27",
    },
    {
        _id: "679824c785768d12b56f24b8",
        title: "The Future of Renewable Energy",
        publisher: { publisherName: "NextGen Media" },
        tags: ["science", "environment"],
        description:
            "The renewable energy sector is experiencing rapid growth, driven by technological innovations and the urgent need to combat climate change.",
        isPremium: false,
        image: "https://i.ibb.co.com/1GSwQrqn/The-Future-of-Renewable-Energy.jpg",
        author: { name: "Alice Johnson", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_1" },
        viewCount: 256,
        createdAt: "2025-01-26",
    },
    {
        _id: "679824c785768d12b56f24ba",
        title: "Climate Change and Its Impacts",
        publisher: { publisherName: "NextGen Media" },
        tags: ["environment", "science"],
        description:
            "Climate change is one of the most pressing issues of our time, with widespread consequences for ecosystems, human health, and global economies.",
        isPremium: true,
        image: "https://i.ibb.co.com/d0WMcfwr/Climate-Change-and-Its-Impacts.jpg",
        author: { name: "Bob Anderson", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_2" },
        viewCount: 372,
        createdAt: "2025-01-26",
    },
    {
        _id: "679824c785768d12b56f24bb",
        title: "The Wonders of Space Exploration",
        publisher: { publisherName: "NextGen Media" },
        tags: ["science", "space"],
        description:
            "Space exploration continues to captivate humanity, pushing the boundaries of what we know about the universe.",
        isPremium: false,
        image: "https://i.ibb.co.com/HDzJ79ps/The-Wonders-of-Space-Exploration.jpg",
        author: { name: "Daisy Miller", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_4" },
        viewCount: 502,
        createdAt: "2025-01-25",
    },
    {
        _id: "679824c785768d12b56f24b9",
        title: "Breakthroughs in Biotechnology",
        publisher: { publisherName: "NextGen Media" },
        tags: ["science", "health"],
        description:
            "Biotechnology is transforming medicine and agriculture, offering innovative solutions to some of the world's most pressing challenges.",
        isPremium: false,
        image: "https://i.ibb.co.com/dJGFNXTk/Breakthroughs-in-Biotechnology.jpg",
        author: { name: "Ethan Hunt", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_5" },
        viewCount: 184,
        createdAt: "2025-01-25",
    },
    {
        _id: "67991546a0dd834ee4562978",
        title: "Chatgpt",
        publisher: { publisherName: "AstroWeekly" },
        tags: ["business"],
        description:
            "ChatGPT is a generative artificial intelligence chatbot developed by OpenAI and launched in 2022, currently based on the GPT-4o large language model.",
        isPremium: false,
        image: "https://i.ibb.co.com/7x3z0z2r/chatgpt.webp",
        author: { name: "Miftahul Jannat", image: "https://lh3.googleusercontent.com/a/ACg8ocJ_6sRWu58khXTWnjB1az_PoZWOWBFF6AGhi3ILCu6MVDgZ0A=s96-c" },
        viewCount: 23,
        createdAt: "2025-01-28",
    },
];

const PUBLISHERS = [
    { _id: "1", publisherName: "TechNow", logo: "https://i.ibb.co.com/68czFqQ/images-q-tbn-ANd9-Gc-RDKaoy-XDg-EWSAI7-VU7tq-T1-VOs-Wp-Mu-HLng-Jg-s.jpg" },
    { _id: "2", publisherName: "GreenWorld", logo: "https://i.ibb.co.com/37F8Sfg/images-q-tbn-ANd9-Gc-QC7i-HGle6u6zackw-Bk-VRaa-TYKDUb-UU0a-FHJQ-s.png" },
    { _id: "3", publisherName: "HealthSphere", logo: "https://i.ibb.co.com/37F8Sfg/images-q-tbn-ANd9-Gc-QC7i-HGle6u6zackw-Bk-VRaa-TYKDUb-UU0a-FHJQ-s.png" },
    { _id: "4", publisherName: "TechTimes", logo: "https://i.ibb.co.com/dtV7Xh0/Screenshot-2022-02-25-170817-e1645826950540.png" },
    { _id: "5", publisherName: "NextGen Media", logo: "https://i.ibb.co.com/68czFqQ/images-q-tbn-ANd9-Gc-RDKaoy-XDg-EWSAI7-VU7tq-T1-VOs-Wp-Mu-HLng-Jg-s.jpg" },
    { _id: "6", publisherName: "BioTech News", logo: "https://i.ibb.co.com/GvfS4jH/images-q-tbn-ANd9-Gc-TMtln-J-Ldw-Bpa4h-Sw-Rrc-IVq-EE7-Iv-3-9-Qz-Q-s.png" },
    { _id: "7", publisherName: "AstroWeekly", logo: "https://i.ibb.co.com/68czFqQ/images-q-tbn-ANd9-Gc-RDKaoy-XDg-EWSAI7-VU7tq-T1-VOs-Wp-Mu-HLng-Jg-s.jpg" },
    { _id: "8", publisherName: "Global Insights", logo: "https://i.ibb.co.com/37F8Sfg/images-q-tbn-ANd9-Gc-QC7i-HGle6u6zackw-Bk-VRaa-TYKDUb-UU0a-FHJQ-s.png" },
];

const TAG_COLORS = {
    health: "bg-green-100 text-green-700",
    science: "bg-blue-100 text-blue-700",
    technology: "bg-orange-100 text-orange-700",
    environment: "bg-emerald-100 text-emerald-700",
    space: "bg-orange-100 text-orange-700",
    business: "bg-orange-100 text-orange-700",
};

// ── Sub-components ─────────────────────────────────────────────────────────────
const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/articles/${article._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            <div className="relative">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = "https://placehold.co/400x200?text=No+Image"; }}
                />
                {article.isPremium && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                        ⭐ Premium
                    </span>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600"}`}>
                            #{tag}
                        </span>
                    ))}
                </div>
                <h3 className="font-bold text-gray-800 text-base leading-snug mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 flex-1">{article.description}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <img
                            src={article.author.image}
                            alt={article.author.name}
                            className="w-7 h-7 rounded-full object-cover border"
                            onError={(e) => { e.target.src = "https://placehold.co/40x40?text=A"; }}
                        />
                        <span className="text-xs text-gray-600 font-medium">{article.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">👁 {article.viewCount}</span>
                </div>
            </div>
        </div>
    );
};

// ── Homepage ───────────────────────────────────────────────────────────────────
const Homepage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [activeTag, setActiveTag] = useState("all");

    const allTags = ["all", "health", "science", "technology", "environment", "space", "business"];
    const featured = ARTICLES[3]; // Space Exploration as hero
    const filtered = activeTag === "all"
        ? ARTICLES
        : ARTICLES.filter((a) => a.tags.includes(activeTag));

    return (
        <div className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>Openpage | Home</title>
            </Helmet>

            {/* ── Hero Banner ── */}
            <section className="relative h-[500px] flex items-end overflow-hidden">
                <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://placehold.co/1400x500?text=Openpage"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 text-white">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {featured.tags.map((t) => (
                            <span key={t} className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/30">#{t}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">{featured.title}</h1>
                    <p className="text-white/80 text-sm md:text-base max-w-2xl mb-5">{featured.description}</p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/articles/${featured._id}`)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
                        >
                            Read Article →
                        </button>
                        <div className="flex items-center gap-2">
                            <img src={featured.author.image} className="w-8 h-8 rounded-full border-2 border-white" onError={(e) => { e.target.src = "https://placehold.co/40?text=A"; }} />
                            <span className="text-sm text-white/80">{featured.author.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Latest Articles ── */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
                        <p className="text-gray-500 text-sm mt-1">Explore the most recent stories from our community</p>
                    </div>
                    <button onClick={() => navigate("/articles")} className="text-orange-600 font-semibold text-sm hover:underline">
                        View All →
                    </button>
                </div>

                {/* Tag filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${activeTag === tag
                                ? "bg-orange-600 text-white border-orange-600"
                                : "bg-white text-gray-600 border-gray-200 hover:border-orange-400"
                                }`}
                        >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((article) => (
                        <ArticleCard key={article._id} article={article} />
                    ))}
                    {filtered.length === 0 && (
                        <p className="col-span-3 text-center text-gray-400 py-10">No articles found for this tag.</p>
                    )}
                </div>
            </section>

            {/* ── Publishers ── */}
            <section className="bg-white py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Publishers</h2>
                    <p className="text-gray-500 text-sm mb-8">Trusted media partners bringing you quality journalism</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {PUBLISHERS.map((pub) => (
                            <div key={pub._id} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group cursor-pointer">
                                <img
                                    src={pub.logo}
                                    alt={pub.publisherName}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-orange-400 transition"
                                    onError={(e) => { e.target.src = "https://placehold.co/48?text=P"; }}
                                />
                                <span className="text-xs text-gray-600 font-medium text-center leading-tight">{pub.publisherName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats Banner ── */}
            <section className="bg-orange-600 py-12">
                <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {[
                        { label: "Articles", value: "1,200+" },
                        { label: "Publishers", value: "16+" },
                        { label: "Authors", value: "80+" },
                        { label: "Readers", value: "50K+" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-extrabold">{stat.value}</p>
                            <p className="text-orange-200 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Subscribe CTA ── */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Never Miss a Story</h2>
                <p className="text-gray-500 mb-6">Get premium articles delivered straight to you. No spam, ever.</p>
                <button
                    onClick={() => navigate("/subscription")}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl"
                >
                    Subscribe Now ✨
                </button>
            </section>

            {/* ── Subscription Modal (after 10s) ── */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full mx-4 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">✕</button>
                        <div className="text-5xl mb-3">🚀</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Subscribe Now!</h2>
                        <p className="text-gray-500 mb-5">Get access to premium content with our subscription plans.</p>
                        <button
                            onClick={() => navigate("/subscription")}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-semibold transition"
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
