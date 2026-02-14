<template>
  <div class="page-container news-page">
    <section class="page-hero">
      <span class="page-eyebrow">Updates</span>
      <h1>News</h1>
      <p>Milestones, awards, and paper acceptances from the lab.</p>
    </section>

    <ul class="news-list stagger-list">
      <li
        v-for="item in newsItems"
        :key="item.date + item.title"
        class="news-card glass-card"
      >
        <p class="news-date">{{ item.date }}</p>
        <p class="news-title">
          <template v-if="item.links && item.links.length">
            {{ item.title }}
            <a
              v-for="link in item.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noreferrer"
            >
              [{{ link.label }}]
            </a>
          </template>
          <template v-else>
            {{ item.title }}
          </template>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewsPage",
  data() {
    return {
      newsItems: [
        {
          date: "Sep 2023",
          title: "One paper got accepted at NeurIPS 2023!",
          links: [
            { label: "paper", url: "https://openreview.net/pdf?id=t2hEZadBBk" },
          ],
        },
        {
          date: "May 2023",
          title: "Two papers are accepted at ACL 2023!",
          links: [
            { label: "1", url: "https://aclanthology.org/2023.acl-long.281/" },
            {
              label: "2",
              url: "https://aclanthology.org/2023.findings-acl.570/",
            },
          ],
        },
        {
          date: "Mar 2023",
          title:
            "Yunchong Song has got the ICLR Travel Award, congratulations!",
          links: [
            {
              label: "profile",
              url: "https://scholar.google.com/citations?user=C-TqDNsAAAAJ",
            },
          ],
        },
        {
          date: "Feb 2023",
          title: "Two papers are accepted at ICASSP 2023!",
          links: [
            { label: "1", url: "https://arxiv.org/abs/2302.09509" },
            { label: "2", url: "https://arxiv.org/abs/2304.05361" },
          ],
        },
        {
          date: "Jan 2023",
          title: "One paper is accepted at ICLR 2023!",
          links: [
            {
              label: "paper",
              url: "https://openreview.net/forum?id=wKPmPBHSnT6",
            },
          ],
        },
        {
          date: "Oct 2022",
          title: "Three papers are accepted at EMNLP 2022!",
          links: [
            {
              label: "1",
              url: "https://aclanthology.org/2022.emnlp-main.211/",
            },
            {
              label: "2",
              url: "https://aclanthology.org/2022.findings-emnlp.173/",
            },
            {
              label: "3",
              url: "https://aclanthology.org/2022.findings-emnlp.114/",
            },
          ],
        },
        {
          date: "Feb 2022",
          title: "Two papers are accepted at ACL 2022!",
          links: [
            { label: "1", url: "https://aclanthology.org/2022.acl-long.308/" },
            { label: "2", url: "https://aclanthology.org/2022.acl-long.502/" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.news-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.news-card {
  padding: 20px 22px;
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 14px;
  align-items: baseline;
}

.news-date {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.news-title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
}

.news-title a {
  margin-left: 6px;
}

@media (max-width: 760px) {
  .news-card {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
