// Form tracking helper — wires contact form submissions to the CRM tracking endpoint.
// Standard CRM field keys go in formData/formLabels. Custom fields go through
// customFields/fileFields/imageDataFields using the id returned by register_custom_field.

type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

export const TRACKING_ID = "tk_81e1a8f14d4845c1b790d9682bbd527f";
export const LOCATION_ID = "BWlbslOHAXC2kZKbiMwa";
export const PROJECT_ID = "1793286545658653540";

// Custom field registered via register_custom_field — "Service Interest" select.
export const SERVICE_INTEREST_FIELD_ID = "YS68V8TbUVHu3mLI5BFY";

const postTrackingEvent = (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
    method: "POST",
    headers: {
      version: "2021-07-28",
    },
    body,
  }).catch(() => {}); // Fire-and-forget — don't block form UX
};

const getTrackingSessionId = () => {
  try {
    const sid = document.cookie.match(/(?:^|;\s*)__vibe_sid=([0-9a-f-]{36})(?:;|$)/)?.[1];
    if (sid) return sid;
  } catch {}
  return crypto.randomUUID();
};

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
};

export function trackContactFormSubmission(values: ContactFormValues) {
  const trackingPayload = {
    type: "external form_submission",
    timestamp: Date.now(),
    formId: "elli-contact-form",
    formData: {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      calendar_notes: values.message,
    },
    formLabels: {
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email",
      phone: "Phone",
      calendar_notes: "Message",
    },
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    trackingId: TRACKING_ID,
    locationId: LOCATION_ID,
    projectId: PROJECT_ID,
    sessionId: getTrackingSessionId(),
    properties: {
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
      source: "ai_studio",
      projectId: PROJECT_ID,
      formName: "Elli Contact Form",
    },
  };

  postTrackingEvent(trackingPayload, {
    customFields: {
      [SERVICE_INTEREST_FIELD_ID]: {
        value: values.serviceInterest,
        label: "Service Interest",
      },
    },
  });
}

/**
 * AI Avatar lead capture — same CRM tracking endpoint, branded as an
 * "AI Avatar Lead" source so it can be filtered in workflows. We only report
 * success after the fetch promise resolves (fire-and-forget is intentionally
 * awaited here so the caller can confirm before telling the visitor the lead
 * was captured).
 */
export type AvatarLeadValues = {
  firstName: string;
  email: string;
  serviceInterest: string;
  company?: string;
};

export async function trackAvatarLeadSubmission(values: AvatarLeadValues): Promise<boolean> {
  const payload = {
    type: "external_form_submission",
    timestamp: Date.now(),
    formId: "elli-ai-avatar-lead",
    formData: {
      first_name: values.firstName,
      email: values.email,
      calendar_notes: values.serviceInterest,
      organization: values.company,
    },
    formLabels: {
      first_name: "First Name",
      email: "Email",
      calendar_notes: "Service Interest",
      organization: "Company Name",
    },
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    trackingId: TRACKING_ID,
    locationId: LOCATION_ID,
    projectId: PROJECT_ID,
    sessionId: getTrackingSessionId(),
    properties: {
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
      source: "ai_studio",
      projectId: PROJECT_ID,
      formName: "AI Avatar Lead",
    },
  };

  const body = new FormData();
  body.append("event", JSON.stringify(payload));

  try {
    const res = await fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
      method: "POST",
      headers: { version: "2021-07-28" },
      body,
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Website Consultation form — captures the lead BEFORE the visitor is sent to
 * the external Google Calendar appointment schedule. Awaited so we only
 * redirect after the CRM event is accepted (or we surface a soft error).
 *
 * The Gmail notification is delivered by a CRM workflow that fires on this
 * formId/formName; this client cannot send email directly without an email
 * backend, so we tag the event so the workflow can match it.
 */
export const WEBSITE_INTEREST_FIELD_ID = "NRdFfeMrooERiCV9z1DO";
export const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.app.google/f7NSyhSGUKvsuC588";

export type ConsultationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  websiteInterest: string;
  message: string;
};

export async function trackConsultationFormSubmission(
  values: ConsultationFormValues,
): Promise<boolean> {
  const parts = values.fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;

  const payload = {
    type: "external_form_submission",
    timestamp: Date.now(),
    formId: "website-consultation",
    formData: {
      first_name: firstName,
      last_name: lastName,
      email: values.email,
      phone: values.phone,
      calendar_notes: values.message,
      [WEBSITE_INTEREST_FIELD_ID]: values.websiteInterest,
    },
    formLabels: {
      first_name: "Full Name (first)",
      last_name: "Full Name (last)",
      email: "Email Address",
      phone: "Phone Number",
      calendar_notes: "Additional Message",
      [WEBSITE_INTEREST_FIELD_ID]: "Website Interest Type",
    },
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    trackingId: TRACKING_ID,
    locationId: LOCATION_ID,
    projectId: PROJECT_ID,
    sessionId: getTrackingSessionId(),
    properties: {
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
      source: "ai_studio",
      projectId: PROJECT_ID,
      formName: "Website Consultation Lead – Pending Booking",
    },
  };

  const body = new FormData();
  body.append("event", JSON.stringify(payload));

  try {
    const res = await fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
      method: "POST",
      headers: { version: "2021-07-28" },
      body,
    });
    return res.ok;
  } catch {
    return false;
  }
}
