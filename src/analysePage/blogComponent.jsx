import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import blogImage from "../assets/images/blog.png";
import picImage from "../assets/images/pic.png";

const BlogComponent = ({ t }) => {
  const [openTab, setOpenTab] = useState('blog');
  const [tab, setTab] = useState('couples');

  return (
    <div className={`${openTab === 'blog' ? 'block' : 'hidden'} transition ease-out duration-100 transform scale-90 opacity-0 opacity-100 scale-100 flex flex-col gap-3 rounded-full`}>
      <h3 className="text-2xl text-primary font-semibold">{t("recommended")}</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 w-fit pb-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex flex-col gap-3 w-[290px]">
              <div className="absolute top-3 left-3 text-xs text-white bg-secondary rounded-[100px] px-2 py-1">
                {t("newPost")}
              </div>
              <img className="w-[290px] h-[176px]" src={blogImage} alt="blog" />
              <div className="pr-8">
                <h4 className="text-lg text-secondary font-semibold">{t("postTitle")}</h4>
                <p className="text-sm text-[#006D81]">{t("postDescription")}</p>
              </div>
              <div className="flex gap-3">
                <div className="text-xs text-[#B5B6B6]">{t("views")}</div>
                <div className="text-xs text-[#005666] font-semibold">{t("likes")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setTab('alltopic')}
            className={`text-sm border-[1px] rounded-[100px] w-fit px-3 py-2 ${tab === 'alltopic' ? 'text-white bg-secondary border-secondary' : 'text-[#828282] bg-transparent border-[#B5B6B6]'}`}
          >
            {t("allTopics")}
          </button>
          <button
            onClick={() => setTab('couples')}
            className={`text-sm border-[1px] rounded-[100px] w-fit px-3 py-2 ${tab === 'couples' ? 'text-white bg-secondary border-secondary' : 'text-[#828282] bg-transparent border-[#B5B6B6]'}`}
          >
            {t("couples")}
          </button>
          <button
            onClick={() => setTab('toxic')}
            className={`text-sm text-[#828282] border-[1px] border-[#B5B6B6] rounded-[100px] w-fit px-3 py-2 ${tab === 'toxic' ? 'text-white bg-secondary border-secondary' : 'text-[#828282] bg-transparent border-[#B5B6B6]'}`}
          >
            {t("toxicBehaviour")}
          </button>
        </div>

        {tab === 'couples' && (
          <div className="flex flex-col gap-[60px] md:flex-row">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-3">
                <img src={picImage} alt="pic" />
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="text-xs text-primary border-[1px] border-primary rounded-[100px] w-fit h-fit px-2 py-1">
                      {t("couples")}
                    </div>
                    <div className="flex gap-3">
                      <div className="text-xs text-[#B5B6B6]">{t("views")}</div>
                      <div className="text-xs text-[#005666] font-semibold">{t("likes")}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-primary font-semibold">{t("tabTitle")}</h4>
                    <p className="text-xs text-[#B5B6B6]">{t("tabDescription")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogComponent;
