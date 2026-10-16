# Simple visitor-sent inquiry

The public `/book` page now uses one form in this order: Name, Phone, Email, vehicle choices Car / Truck / SUV / Other, and Notes/Details. Contact fields and one vehicle choice are required; notes are optional. A full name is entered in one field. There is no service, condition, address or scheduling step. A valid service link can prefill the Notes/Details field, which remains editable.

Preparing the inquiry validates in the browser and creates an encoded mailto link to `info@landrysmobiledetail.com`. It does not call a server action, `/api/leads`, Urable, or a mail service. The visitor must review and press Send in their email app. No sent, received or appointment confirmation is shown. The prepared message has an always-visible manual-copy field, clipboard button, and Edit details action that retains every field. The form does not persist personal data across reloads; visitors are told to keep the page open.

The earlier booking component and lead API are retained for recovery/future work, but are not mounted by the public page. They do not receive the simplified form's data. Tests cover the supported choices, single-name validation, and encoding/copy fidelity. Live QA must prepare and copy synthetic details without opening an email composer or sending an email.
