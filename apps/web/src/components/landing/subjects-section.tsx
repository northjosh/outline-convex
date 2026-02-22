const SUBJECTS = [
  { emoji: "📐", name: "Mathematics" },
  { emoji: "📝", name: "English Language" },
  { emoji: "🔬", name: "Integrated Science" },
  { emoji: "🌍", name: "Social Studies" },
  { emoji: "💻", name: "Core ICT" },
  { emoji: "🧬", name: "Biology" },
  { emoji: "⚗️", name: "Chemistry" },
  { emoji: "⚡", name: "Physics" },
  { emoji: "📊", name: "Economics" },
  { emoji: "🗺️", name: "Geography" },
  { emoji: "🏛️", name: "Government" },
  { emoji: "📖", name: "Literature" },
] as const;

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Subjects We Cover</h2>
          <p className="text-muted-foreground mt-3">
            Comprehensive support for WASSCE and Cambridge exam subjects
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {SUBJECTS.map(({ emoji, name }) => (
            <div
              key={name}
              className="card-depth bg-card border-border flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-muted/50"
            >
              <span className="text-base">{emoji}</span>
              <span className="font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
