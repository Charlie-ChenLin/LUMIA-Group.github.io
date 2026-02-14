<template>
  <div class="page-container home-page">
    <section class="page-hero">
      <span class="page-eyebrow">LUMIA Group</span>
      <h1>{{ homeData.name }}</h1>
      <p>{{ homeData.desc }}</p>
      <div class="hero-actions">
        <button class="action action-primary" @click="goTo('research')">
          Explore Research
        </button>
        <button class="action action-secondary" @click="goTo('people')">
          Meet the Team
        </button>
      </div>
    </section>

    <section class="highlights stagger-list">
      <article
        v-for="item in highlightCards"
        :key="item.title"
        class="highlight-card glass-card"
      >
        <p class="highlight-title">{{ item.title }}</p>
        <p class="highlight-desc">{{ item.description }}</p>
      </article>
    </section>

    <section class="showcase">
      <div class="section-head">
        <h2>Featured Project</h2>
        <p>Recent work from the group</p>
      </div>
      <div class="project-grid stagger-list">
        <article
          v-for="item in homeData.projectList"
          :key="item.id"
          class="project-card glass-card"
        >
          <img :src="item.img" :alt="item.name || 'Project image'" />
          <div class="project-info">
            <h3>{{ item.name || "Featured Work" }}</h3>
            <p>
              {{
                item.intro ||
                "Selected highlights from our current research pipeline."
              }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { homeData } from "@/data/home";

export default {
  name: "HomePage",
  data() {
    return {
      homeData,
      highlightCards: [
        {
          title: "Research Focus",
          description:
            "Large language models, efficient training, multimodal intelligence, and robust reasoning.",
        },
        {
          title: "Open Collaboration",
          description:
            "We work closely with students, researchers, and industry partners on long-horizon AI problems.",
        },
        {
          title: "Impact Driven",
          description:
            "From foundational methods to practical systems, we focus on ideas that can scale and transfer.",
        },
      ],
    };
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style lang="less" scoped>
.hero-actions {
  position: relative;
  margin-top: 26px;
  display: flex;
  gap: 12px;
}

.action {
  border: 0;
  border-radius: 999px;
  padding: 11px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.action:hover {
  transform: translateY(-1px);
}

.action-primary {
  color: #fff;
  background: linear-gradient(135deg, #0a84ff, #0071e3);
  box-shadow: 0 10px 18px rgba(0, 113, 227, 0.32);
}

.action-secondary {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--line-subtle);
}

.highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 32px;
}

.highlight-card {
  padding: 20px;
}

.highlight-title {
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 600;
}

.highlight-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.project-card {
  overflow: hidden;
}

.project-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 1px solid var(--line-subtle);
}

.project-info {
  padding: 18px 20px 22px;
}

.project-info h3 {
  margin: 0 0 8px;
  font-size: 1.15rem;
}

.project-info p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 980px) {
  .highlights {
    grid-template-columns: 1fr;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-wrap: wrap;
  }
}
</style>
