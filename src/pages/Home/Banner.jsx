
const Banner = () => {
    return (
        <div className="hero min-h-[650px] rounded-xl" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <div className="hero-overlay bg-opacity-60 rounded-xl w-full"></div>
            <div className="hero-content text-center text-neutral-content h-[400px]">
                <div className="max-w-full">
                    <div className="carousel w-full lg:h-[600px] pt-10">
                        <div id="slide1" className="carousel-item relative w-full">
                            <div className="flex flex-col space-y-5 w-1/3 ml-10">
                                <h2 className="text-5xl font-bold text-left text-white mb-5">Empower Your Learning Journey with Us</h2>
                                <p className="text-lg text-white text-left">Create, share, and complete assignments with your study buddies, making learning a collaborative and rewarding experience.</p>
                                <div className="flex gap-7">
                                    <button className="btn btn-primary text-white w-1/2">Discover More</button>
                                    <button className="btn btn-outline btn-secondary w-1/2">Latest Project</button>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 right-5 -bottom-5">
                                <a href="#slide4" className="btn btn-circle mr-2">❮</a>
                                <a href="#slide2" className="btn btn-circle bg-indigo-600 border-0 text-white">❯</a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <div className="flex flex-col space-y-5 w-1/3 ml-10">
                                <h2 className="text-5xl font-bold text-left text-white mb-5">Stay connected with your study group wherever you go.</h2>
                                <p className="text-lg text-white text-left">Experience a responsive and user-friendly study platform designed for the modern learner, offering an intuitive interface for easy navigation.</p>
                                <div className="flex gap-7">
                                    <button className="btn btn-primary text-white w-1/2">Discover More</button>
                                    <button className="btn btn-outline btn-secondary w-1/2">Latest Project</button>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 right-10 -bottom-5">
                                <a href="#slide1" className="btn btn-circle mr-2">❮</a>
                                <a href="#slide3" className="btn btn-circle bg-indigo-600 border-0 text-white">❯</a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <div className="flex flex-col space-y-5 w-1/3 ml-10">
                                <h2 className="text-5xl font-bold text-left text-white mb-5">Your journey to academic excellence begins here</h2>
                                <p className="text-lg text-white text-left">oin a community of like-minded students and learn together, fostering a supportive environment for knowledge sharing and growth.</p>
                                <div className="flex gap-7">
                                    <button className="btn btn-primary text-white w-1/2">Discover More</button>
                                    <button className="btn btn-outline btn-secondary w-1/2">Latest Project</button>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 right-5 -bottom-5">
                                <a href="#slide2" className="btn btn-circle mr-2">❮</a>
                                <a href="#slide1" className="btn btn-circle bg-indigo-600 border-0 text-white">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner