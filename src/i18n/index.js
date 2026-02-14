import Vue from "vue";

const STORAGE_KEY = "lumia-site-lang";
const SUPPORTED_LANGS = ["en", "zh"];

function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

function detectLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    return saved;
  }

  const browserLang = (window.navigator.language || "en").toLowerCase();
  return browserLang.startsWith("zh") ? "zh" : "en";
}

function setDocumentLang(lang) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
}

const messages = {
  en: {
    header: {
      brand: "LUMIA Lab",
      nav: {
        people: "People",
        research: "Research",
        news: "News",
        contact: "Contact",
        feedback: "Beta测试反馈",
      },
    },
    home: {
      eyebrow: "LUMIA Group",
      title: "LUMIA Lab",
      desc: "Pursuing principled machine intelligence through language, multimodal learning, and efficient deep systems.",
      actions: {
        research: "Explore Research",
        people: "Meet the Team",
      },
      highlights: [
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
      featuredTitle: "Featured Project",
      featuredSubtitle: "Recent work from the group",
      projectFallbackTitle: "Featured Work",
      projectFallbackIntro:
        "Selected highlights from our current research pipeline.",
      projects: {
        1: {
          name: "Long-Context Modeling",
          intro:
            "Architectures and training recipes for scalable, high-fidelity reasoning over long sequences.",
        },
        2: {
          name: "Multimodal Intelligence",
          intro:
            "Unified representations across text, audio, and vision to improve robustness and transfer.",
        },
      },
    },
    people: {
      eyebrow: "Team",
      title: "People",
      desc: "Meet faculty members, students, and collaborators shaping the LUMIA research agenda.",
      groups: {
        Faculty: "Faculty",
        PhD: "PhD",
        Master: "Master",
        Undergrads: "Undergrads",
        Alumni: "Alumni",
      },
      member: "member",
      members: "members",
    },
    news: {
      eyebrow: "Updates",
      title: "News",
      desc: "Milestones, awards, and paper acceptances from the lab.",
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Contact",
      desc: "We welcome collaboration proposals, student applications, and technical partnerships.",
      cta: "Apply to Join",
      sections: [
        {
          header: "Graduate Recruitment",
          list: [
            "Openings for 2024: xx PhD positions, xx Master positions, and internship opportunities. We look for students who are motivated in NLP and machine intelligence research, proactive in both research and engineering work, resilient under uncertainty, and committed to long-term contribution.",
            "Email: xxx@sjtu.edu.cn, Tel: xxxx",
          ],
        },
        {
          header: "Industry Collaboration / Advisory",
          list: [
            "In the AGI era, meaningful breakthroughs require open collaboration across academia and industry.",
            "We continuously invest in practical AI technologies and real-world deployment, and welcome partnerships in research transfer and product innovation.",
            "Email: xxx@sjtu.edu.cn, Tel: xxxx",
          ],
        },
      ],
    },
    application: {
      eyebrow: "Join Us",
      title: "Application",
      desc: "Tell us about your interests and background. We review applications for PhD, Master, undergraduate, and internship tracks.",
      labels: {
        name: "Name",
        email: "Email",
        track: "Track",
        startDate: "Available Start Date",
        interests: "Research Interests",
        skills: "Skills",
        links: "Portfolio / Homepage",
        statement: "Statement",
      },
      placeholders: {
        name: "Your full name",
        email: "name@example.com",
        track: "Select a track",
        startDate: "Select a date",
        interests: "e.g. LLMs, reasoning, multimodal modeling",
        links:
          "Add links to your homepage, Google Scholar, GitHub, or selected papers",
        statement:
          "Briefly describe why you want to join LUMIA and what you want to build.",
      },
      tracks: {
        phd: "PhD",
        master: "Master",
        undergrad: "Undergraduate",
        intern: "Internship",
      },
      skills: {
        ml: "Machine Learning",
        nlp: "Natural Language Processing",
        speech: "Speech / Multimodal",
        systems: "Distributed Systems",
      },
      buttons: {
        submit: "Submit",
        reset: "Reset",
      },
      messages: {
        submitSuccess: "Application submitted. Please follow up by email if needed.",
      },
      rules: {
        nameRequired: "Please input your name",
        nameLength: "Length should be 2 to 32 characters",
        emailRequired: "Please input your email",
        emailInvalid: "Please input a valid email",
        trackRequired: "Please select a track",
        startDateRequired: "Please select a date",
        interestsRequired: "Please describe your interests",
        interestsLength: "Please provide more details",
        skillsRequired: "Please select at least one skill tag",
        statementRequired: "Please provide a statement",
        statementLength: "Please write at least 40 characters",
      },
    },
    research: {
      eyebrow: "Publications",
      title: "Research",
      desc: "We build efficient, robust, and interpretable machine intelligence systems across language, graph learning, and multimodal understanding.",
      githubTitle: "Open Source at LUMIA",
      githubDesc:
        "All public code releases, reproducible implementations, and active repositories are maintained in our GitHub organization.",
      githubButton: "Visit LUMIA Group on GitHub",
    },
    feedback: {
      eyebrow: "Beta",
      title: "Feedback",
      desc: "This website is in beta. Your feedback helps us improve content, interaction quality, and user experience.",
      openButton: "Open Feedback Window",
      infoTitle: "How feedback is handled",
      infoText:
        "After you submit, feedback will be sent to this computer and saved locally.",
      lastSaved: "Latest local save time:",
      dialogTitle: "Submit Feedback",
      labels: {
        email: "Email (optional)",
        message: "Your feedback",
      },
      placeholders: {
        email: "Optional email address",
        message:
          "Describe your issue or suggestion. Screenshots and reproducible steps are very helpful.",
      },
      buttons: {
        cancel: "Cancel",
        submit: "Submit",
      },
      rules: {
        emailInvalid: "Please input a valid email address.",
        messageRequired: "Please provide your feedback.",
        messageLength: "Please enter at least 8 characters.",
      },
      messages: {
        submitSuccess: "Feedback has been sent to the host computer.",
        submitError:
          "Feedback submission failed. Please ensure the host feedback service is running.",
      },
    },
  },
  zh: {
    header: {
      brand: "LUMIA实验室",
      nav: {
        people: "成员",
        research: "研究",
        news: "新闻",
        contact: "联系",
        feedback: "Beta测试反馈",
      },
    },
    home: {
      eyebrow: "LUMIA 团队",
      title: "LUMIA实验室",
      desc: "我们专注于语言、多模态学习与高效深度系统，探索更具原理性和可扩展性的机器智能。",
      actions: {
        research: "查看研究成果",
        people: "了解团队成员",
      },
      highlights: [
        {
          title: "研究重点",
          description:
            "围绕大模型、训练效率、多模态智能与稳健推理开展系统性研究。",
        },
        {
          title: "开放协作",
          description:
            "与学生、学术伙伴和产业团队持续协作，共同攻克长期技术问题。",
        },
        {
          title: "面向影响",
          description:
            "从基础方法到可落地系统，关注可迁移、可扩展、可复现的研究价值。",
        },
      ],
      featuredTitle: "精选项目",
      featuredSubtitle: "团队近期研究方向",
      projectFallbackTitle: "精选工作",
      projectFallbackIntro: "来自我们当前研究管线的代表性成果。",
      projects: {
        1: {
          name: "长上下文建模",
          intro: "面向长序列推理的模型架构与训练方案，提升规模化场景下的稳定性与效率。",
        },
        2: {
          name: "多模态智能",
          intro: "统一文本、语音与视觉表示，提高模型在复杂任务中的鲁棒性和迁移能力。",
        },
      },
    },
    people: {
      eyebrow: "团队",
      title: "成员",
      desc: "了解正在共同推进 LUMIA 研究方向的教师、学生与合作成员。",
      groups: {
        Faculty: "教师",
        PhD: "博士生",
        Master: "硕士生",
        Undergrads: "本科生",
        Alumni: "毕业成员",
      },
      member: "位成员",
      members: "位成员",
    },
    news: {
      eyebrow: "动态",
      title: "新闻",
      desc: "实验室近期的论文录用、奖项与里程碑更新。",
    },
    contact: {
      eyebrow: "联系",
      title: "联系我们",
      desc: "欢迎学术合作、学生申请与技术共创交流。",
      cta: "申请加入",
      sections: [],
    },
    application: {
      eyebrow: "加入我们",
      title: "申请表",
      desc: "请填写你的研究兴趣与背景信息。我们会评估博士、硕士、本科及实习申请。",
      labels: {
        name: "姓名",
        email: "邮箱",
        track: "申请类型",
        startDate: "可到岗时间",
        interests: "研究兴趣",
        skills: "技能标签",
        links: "主页 / 作品链接",
        statement: "个人陈述",
      },
      placeholders: {
        name: "请输入你的姓名",
        email: "name@example.com",
        track: "请选择申请类型",
        startDate: "请选择日期",
        interests: "例如：大模型、推理、多模态",
        links: "请填写个人主页、Google Scholar、GitHub 或代表性论文链接",
        statement: "简要说明你为什么想加入 LUMIA，以及你希望开展什么研究或项目。",
      },
      tracks: {
        phd: "博士",
        master: "硕士",
        undergrad: "本科",
        intern: "实习",
      },
      skills: {
        ml: "机器学习",
        nlp: "自然语言处理",
        speech: "语音 / 多模态",
        systems: "分布式系统",
      },
      buttons: {
        submit: "提交",
        reset: "重置",
      },
      messages: {
        submitSuccess: "申请已提交，如有需要请通过邮件进一步联系。",
      },
      rules: {
        nameRequired: "请输入姓名",
        nameLength: "姓名长度需在 2 到 32 个字符之间",
        emailRequired: "请输入邮箱",
        emailInvalid: "请输入有效邮箱地址",
        trackRequired: "请选择申请类型",
        startDateRequired: "请选择可到岗时间",
        interestsRequired: "请填写研究兴趣",
        interestsLength: "请补充更详细的研究兴趣描述",
        skillsRequired: "请至少选择一个技能标签",
        statementRequired: "请填写个人陈述",
        statementLength: "个人陈述请至少填写 40 个字符",
      },
    },
    research: {
      eyebrow: "成果",
      title: "研究",
      desc: "我们围绕语言、图学习与多模态理解，构建高效、稳健且可解释的机器智能系统。",
      githubTitle: "LUMIA 开源项目",
      githubDesc:
        "实验室公开代码、可复现实验实现与持续维护仓库均集中在 GitHub 组织中。",
      githubButton: "访问 LUMIA Group 的 GitHub",
    },
    feedback: {
      eyebrow: "Beta",
      title: "反馈",
      desc: "当前网站处于 Beta 阶段，欢迎提交体验问题和改进建议，帮助我们持续优化。",
      openButton: "打开反馈窗口",
      infoTitle: "反馈处理说明",
      infoText: "提交后，反馈会发送到这台电脑，并保存在本地文件中。",
      lastSaved: "最近一次本地保存时间：",
      dialogTitle: "提交反馈",
      labels: {
        email: "邮箱（可选）",
        message: "反馈内容",
      },
      placeholders: {
        email: "可填写邮箱，便于后续联系",
        message: "请描述问题或建议。若有截图、复现步骤会更有帮助。",
      },
      buttons: {
        cancel: "取消",
        submit: "提交",
      },
      rules: {
        emailInvalid: "请输入有效邮箱地址。",
        messageRequired: "请填写反馈内容。",
        messageLength: "请至少输入 8 个字符。",
      },
      messages: {
        submitSuccess: "反馈已发送到主机电脑。",
        submitError: "提交失败，请确认主机反馈服务已启动。",
      },
    },
  },
};

const initialLang = detectLanguage();

export const i18nState = Vue.observable({
  lang: initialLang,
});

setDocumentLang(initialLang);

export function setLang(lang) {
  const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : "en";
  i18nState.lang = nextLang;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, nextLang);
  }
  setDocumentLang(nextLang);
}

export function toggleLang() {
  setLang(i18nState.lang === "en" ? "zh" : "en");
}

export function getMessage(lang, path) {
  const targetLang = SUPPORTED_LANGS.includes(lang) ? lang : "en";
  const value = getValueByPath(messages[targetLang], path);
  if (value !== undefined) {
    return value;
  }
  return getValueByPath(messages.en, path);
}

export function translate(lang, path) {
  const value = getMessage(lang, path);
  return value !== undefined ? value : path;
}
