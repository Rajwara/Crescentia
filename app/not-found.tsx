import { ButtonArrow } from "@/components/Icons";
import WebflowRuntime from "@/components/WebflowRuntime";
import { img } from "@/lib/images";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <>
      <section className="_404-section">
        <div className="w-layout-blockcontainer _404-container w-container">
          <div className="_404-block">
            <div className="_404-text-1">Oops, Wrong Turn</div>
            <div className="_404-inner-block">
              <div className="_404-heading-block">
                <img {...img("gradient-404")} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" alt="" className="_404-gradient" />
                <h1 className="_404-heading">
                  4<span className="_404-text-span">0</span>4
                </h1>
                <img {...img("heritage-sourdough")} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" alt="" className="_404-image" />
              </div>
              <div className="_404-text-block">Sorry, we can’t find the page you’re looking for</div>
            </div>
            <div className="_404-flex-2">
              <div className="_404-text-2">Sorry, Page Not Found</div>
              <a data-w-id="e182e136-2f10-ef33-f0e5-0300f6ade3dd" href="/" className="primary-button _404 w-inline-block">
                <div className="text-block-5">HEAD BACK TO HOME</div>
                <ButtonArrow variant="_404" />
              </a>
              <div className="_404-text-2 _2nd">Something Went Wrong</div>
            </div>
          </div>
        </div>
      </section>
      <WebflowRuntime page="notFound" />
    </>
  );
}
