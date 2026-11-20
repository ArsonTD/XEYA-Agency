/**
 * Raíz de composición: único lugar donde los casos de uso (application)
 * se conectan con sus adaptadores (infrastructure). La UI importa de aquí.
 */
import { makeCookieConsent } from "@/application/cookieConsent";
import { makeGetCompanyProfile } from "@/application/getCompanyProfile";
import { makeGetInstagramFeed } from "@/application/getInstagramFeed";
import { makeGetProjects } from "@/application/getProjects";
import { makeRequestContact } from "@/application/requestContact";
import { makeSendContact } from "@/application/sendContact";
import { StaticCompanyProfileRepository } from "./company/StaticCompanyProfileRepository";
import { HttpContactRepository } from "./contact/HttpContactRepository";
import { StaticProjectRepository } from "./portfolio/StaticProjectRepository";
import { LocalStorageCookieConsentRepository } from "./privacy/LocalStorageCookieConsentRepository";
import { StaticInstagramFeedRepository } from "./social/StaticInstagramFeedRepository";

export const getCompanyProfile = makeGetCompanyProfile(new StaticCompanyProfileRepository());
export const getInstagramFeed = makeGetInstagramFeed(new StaticInstagramFeedRepository());
export const getProjects = makeGetProjects(new StaticProjectRepository());
export const cookieConsent = makeCookieConsent(new LocalStorageCookieConsentRepository());
const contactRepository = new HttpContactRepository();
export const sendContact = makeSendContact(contactRepository);
export const requestContact = makeRequestContact(contactRepository);
