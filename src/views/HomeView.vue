<template>
  <div class="page-container home-page">
    <section class="page-hero">
      <span class="page-eyebrow">{{ t("home.eyebrow") }}</span>
      <h1>{{ t("home.title") }}</h1>
      <p>{{ t("home.desc") }}</p>
      <div class="hero-actions">
        <button class="action action-primary" @click="goTo('research')">
          {{ t("home.actions.research") }}
        </button>
        <button class="action action-secondary" @click="goTo('people')">
          {{ t("home.actions.people") }}
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
        <h2>{{ t("home.featuredTitle") }}</h2>
        <p>{{ t("home.featuredSubtitle") }}</p>
      </div>
      <div class="project-grid stagger-list">
        <article
          v-for="item in localizedProjects"
          :key="item.id"
          class="project-card glass-card"
        >
          <img :src="item.img" :alt="item.name || t('home.projectFallbackTitle')" />
          <div class="project-info">
            <h3>{{ item.name || t("home.projectFallbackTitle") }}</h3>
            <p>{{ item.intro || t("home.projectFallbackIntro") }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { homeData } from "@/data/home";
import { getMessage, i18nState, translate } from "@/i18n";

export default {
  name: "HomePage",
  data() {
    return {
      homeData,
    };
  },
  computed: {
    lang() {
      return i18nState.lang;
    },
    highlightCards() {
      return this.msg("home.highlights") || [];
    },
    localizedProjects() {
      return this.homeData.projectList.map((item) => {
        const localizedItem = this.msg(`home.projects.${item.id}`);
        return {
          ...item,
          name: localizedItem && localizedItem.name ? localizedItem.name : item.name,
          intro: localizedItem && localizedItem.intro ? localizedItem.intro : item.intro,
        };
      });
    },
  },
  methods: {
    t(path) {
      return translate(this.lang, path);
    },
    msg(path) {
      return getMessage(this.lang, path);
    },
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
