export default function Contact() {
  return (
    <section id="contact-info" className="bg-[#ede7df] px-8 py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-500">
          Start a Project
        </p>

        <h2 className="font-serif text-5xl leading-tight text-stone-900">
          Let’s Create Something Timeless
        </h2>

        <div className="my-10 h-px w-24 bg-stone-300" />

        <p className="max-w-2xl text-lg leading-8 text-stone-600">
          Whether you are sourcing materials for a hospitality project,
          private residence, or commercial interior, we would be delighted
          to assist.
        </p>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          
          {/* REQUEST SAMPLE */}

          <div className="border border-stone-300 bg-[#f4efe7] p-12">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500">
              Request Sample
            </p>

            <h3 className="font-serif text-4xl text-stone-900">
              Experience Texture in Person
            </h3>

            <p className="mt-6 max-w-lg text-stone-600 leading-8">
              Receive curated material samples to explore texture,
              craftsmanship, and color before specifying for your project.
            </p>

            <a
              href="mailto:hello@wevinewallcoverings.com?subject=Sample Request"
              className="mt-10 inline-block border border-stone-900 px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-stone-900 hover:text-white"
            >
              Request Sample Kit
            </a>
          </div>

          {/* CONTACT */}

          <div className="border border-stone-300 bg-[#f4efe7] p-12">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500">
              Contact
            </p>

            <h3 className="font-serif text-4xl text-stone-900">
              Project Inquiry
            </h3>

            <p className="mt-6 text-stone-600 leading-8">
              Residential, hospitality, retail, and custom interior
              projects.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              <a
                href="mailto:hello@wevinewallcoverings.com"
                className="text-stone-900 transition hover:opacity-60"
              >
                HELLO TEST 999
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="text-stone-900 transition hover:opacity-60"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}