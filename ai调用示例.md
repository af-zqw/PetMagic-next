# Quickstart

## What Is the Model API?

The RunComfy Model API gives you a unified, production‑ready RESTful API to run any model inside the RunComfy Playground. RunComfy handles queuing, rate-limit, monitoring and smart routing, etc., then returns a request ID immediately and hosted CDN URLs when the run completes. Integrate once and reuse across all models.

***

## Choose the Model

In this example, we’ll use one of our most popular models, [blackforestlabs/flux-1-kontext/pro/edit](https://www.runcomfy.com/playground/blackforestlabs/flux-1-kontext-pro/image-to-image). Its `model_id` is `blackforestlabs/flux-1-kontext/pro/edit`, which you’ll call via the [Async Queue API](/model-apis/async-queue-endpoints) at the Base URL `https://model-api.runcomfy.net`.

<img src="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6f5362e4a114134355af90d24e1ecca8" alt="Alt RunComfy model id" data-og-width="1466" width="1466" data-og-height="673" height="673" data-path="docs-image/playground-model-id.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=280&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=89c805a47db44bae61d01dc8f6172ed9 280w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=560&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8aea0daf37d3ed483720407bc8e2dadc 560w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=840&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6d74342e953b62393e22711ec2e9b04a 840w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1100&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6dbfa81c43d7d9aa38167dc41e430d32 1100w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1650&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8792e1229ff88be0005a5465cf4c4538 1650w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=2500&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=dcb77838048a3d129eab0a468afd1aca 2500w" />

***

## Authentication

All API calls require a Bearer token. Add the header `Authorization: Bearer <token>` to every request (replace `<token>` with your API key). Get your API key from the [Profile](https://www.runcomfy.com/profile) page (click your profile icon in the upper-right).

***

## Submit a Request

Create a JSON body that matches this model’s input schema. On success you’ll receive a `request_id` and resource CDN URLs. If the model API expects input files, please pass public HTTPS URLs that can be fetched from RunComfy server‑side.

**Request Example**

```bash  theme={null}
curl --request POST \
  --url https://model-api.runcomfy.net/v1/models/blackforestlabs/flux-1-kontext/pro/edit \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <token>" \
  --data '{
    "prompt": "She is now holding an orange umbrella and smiling",
    "image_url": "https://playgrounds-storage-public.runcomfy.net/tools/7063/media-files/usecase1-1-input.webp",
    "seed": 81030369,
    "aspect_ratio": "16:9"
  }'
```

Tip: Please follow model’s Input schema (API/Schema → properties). You can view the schema on the model’s API page in the Playground: [blackforestlabs/flux-1-kontext/pro/edit API page](https://runcomfy.com/playground/blackforestlabs/flux-1-kontext-pro/image-to-image/api#input-schema).

<img src="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=22df5fcfafcaa8b4a85da60e408f4ee5" alt="Alt RunComfy playground model input schema" data-og-width="1466" width="1466" data-og-height="827" height="827" data-path="docs-image/playground-model-input-schema.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=280&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=489f4b5fb9b4ef62ecdaf6e631b67171 280w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=560&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=60d313b5e6789ea82dcdcefa17a84045 560w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=840&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=21398a31c92d4968c35cdec66c315363 840w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=1100&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=09136a415980e07bdc91fb210935f821 1100w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=1650&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=fc4e710666ce1547a60d4e48bb9c54d9 1650w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=2500&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8e7275c0096a1856feff7d3235add337 2500w" />

***

## Monitor Request Status

Poll `GET /v1/requests/{request_id}/status` until the request moves through `in_queue` → `in_progress` → `completed`.

**Request Example**

```bash  theme={null}
curl --request GET \
  --url https://model-api.runcomfy.net/v1/requests/{request_id}/status \
  --header "Authorization: Bearer <token>"
```

***

## Retrieve Request Results

Call `GET /v1/requests/{request_id}/result` to fetch outputs (e.g., an `image` URL)

**Request Example**

```bash  theme={null}
curl --request GET \
  --url https://model-api.runcomfy.net/v1/requests/{request_id}/result \
  --header "Authorization: Bearer <token>"
```


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.runcomfy.com/llms.txt



# Authentication

RunComfy's API endpoints require Bearer token authentication for secure access. Include your API key in the `Authorization` header like this:  `Authorization: Bearer YOUR_API_KEY`

## Get an API Key

Get your API key from the [Profile](https://www.runcomfy.com/profile) page (click your profile icon in the upper-right).

<img src="https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=c8e6c06800d999193db12fdeed700eb2" alt="Alt RunComfy Profile Button" data-og-width="1470" width="1470" data-og-height="431" height="431" data-path="docs-image/profile-button.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=280&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=68d3fc8639ba94073ebde4bb32dfb0eb 280w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=560&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=249d6157db642f18a981b03e6a70a4bd 560w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=840&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=280516f824a7e62fb3e4eb0c1927e421 840w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=1100&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=4309c4a506dba29e79eaa1247c2890d3 1100w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=1650&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=c3f0a8b40b1682b19e58506174b76de5 1650w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/profile-button.webp?w=2500&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=826fac83f0d5dd0e47ad2bdea7ab8196 2500w" />

Then find **API Token** under **Account**.

<img src="https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=b223e46928ff66189df7df4f73b7206e" alt="Alt RunComfy API Token" data-og-width="1460" width="1460" data-og-height="211" height="211" data-path="docs-image/api-token.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=280&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=d43495632e8f6ebde84146f2870dec6a 280w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=560&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=f5c666f02344a5c28eb3f7d01ec12b4d 560w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=840&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=655b2d5d30495a436ba728b1f6aa08cb 840w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=1100&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=c5fb99b63b04e05b9642cb684c2a3a91 1100w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=1650&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=285f30abae23dddfdc8d241d7de896b7 1650w, https://mintcdn.com/inceptionsaiinc/4xcluLsVI-oSofYg/docs-image/api-token.webp?w=2500&fit=max&auto=format&n=4xcluLsVI-oSofYg&q=85&s=318c3104fe30702ff861ef6b4bf5a60b 2500w" />

If you **Regenerate** your API key, the old key is revoked immediately, update all integrations and deployment environments accordingly.

Protect your API key by keeping it out of client-side environments such as browsers, mobile apps, or GUI tools. Instead, route requests through a server-side proxy to keep the key safe and follow best practices for API integrations.


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.runcomfy.com/llms.txt


# Async Queue Endpoints

These endpoints let you run models listed in the [Playground](https://www.runcomfy.com/playground) in the background. Submit a job, check progress, fetch the result, or cancel while it’s still queued.

## Endpoints

**Base URL**: `https://model-api.runcomfy.net`

| Endpoint                           | Method | Purpose                        |
| ---------------------------------- | ------ | ------------------------------ |
| `/v1/models/{model_id}`            | `POST` | Submit an asynchronous request |
| `/v1/requests/{request_id}/status` | `GET`  | Check request status           |
| `/v1/requests/{request_id}/result` | `GET`  | Retrieve request result        |
| `/v1/requests/{request_id}/cancel` | `POST` | Cancel a queued request        |

## Common Path Parameters

`model_id` string (required). The identifier of the model you want to run (e.g., `blackforestlabs/flux-1-kontext/pro/edit`).
<img src="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6f5362e4a114134355af90d24e1ecca8" alt="Alt RunComfy model id" data-og-width="1466" width="1466" data-og-height="673" height="673" data-path="docs-image/playground-model-id.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=280&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=89c805a47db44bae61d01dc8f6172ed9 280w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=560&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8aea0daf37d3ed483720407bc8e2dadc 560w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=840&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6d74342e953b62393e22711ec2e9b04a 840w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1100&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6dbfa81c43d7d9aa38167dc41e430d32 1100w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1650&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8792e1229ff88be0005a5465cf4c4538 1650w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=2500&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=dcb77838048a3d129eab0a468afd1aca 2500w" />

`request_id` string (required for non‑submit endpoints). Returned by `POST /v1/models/{model_id}`; use it to check status, fetch result, or cancel.

***

## Submit a Request

Submit an asynchronous request to a Playground model. Returns a `request_id` and convenience URLs to poll and fetch results.

```
POST /v1/models/{model_id}
```

### **Request Example**

Example using the [blackforestlabs/flux-1-kontext/pro/edit](https://www.runcomfy.com/playground/blackforestlabs/flux-1-kontext-pro/image-to-image) model:

```bash  theme={null}
curl --request POST \
  --url https://model-api.runcomfy.net/v1/models/blackforestlabs/flux-1-kontext/pro/edit \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <token>" \
  --data '{
    "prompt": "She is now holding an orange umbrella and smiling",
    "image_url": "https://playgrounds-storage-public.runcomfy.net/tools/7063/media-files/usecase1-1-input.webp",
    "seed": 81030369,
    "aspect_ratio": "16:9"
  }'
```

Request body keys (e.g., `prompt`, `image_url`, `seed`, `aspect_ratio`) map 1:1 to this model’s Input schema. See the model’s API page in the Playground for required fields, types, enums, and defaults. For reference, see the Input schema on the [blackforestlabs/flux-1-kontext/pro/edit API page](https://runcomfy.com/playground/blackforestlabs/flux-1-kontext-pro/image-to-image/api#input-schema).

<img src="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=22df5fcfafcaa8b4a85da60e408f4ee5" alt="Alt RunComfy playground model input schema " data-og-width="1466" width="1466" data-og-height="827" height="827" data-path="docs-image/playground-model-input-schema.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=280&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=489f4b5fb9b4ef62ecdaf6e631b67171 280w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=560&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=60d313b5e6789ea82dcdcefa17a84045 560w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=840&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=21398a31c92d4968c35cdec66c315363 840w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=1100&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=09136a415980e07bdc91fb210935f821 1100w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=1650&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=fc4e710666ce1547a60d4e48bb9c54d9 1650w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-input-schema.webp?w=2500&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8e7275c0096a1856feff7d3235add337 2500w" />

### **Response Example**

```json  theme={null}
{
  "request_id": "{request_id}",
  "status_url": "https://model-api.runcomfy.net/v1/requests/{request_id}/status",
  "result_url": "https://model-api.runcomfy.net/v1/requests/{request_id}/result",
  "cancel_url": "https://model-api.runcomfy.net/v1/requests/{request_id}/cancel"
}
```

Successful requests return 200 OK with a JSON object providing request tracking details.

* `request_id` (string): Unique identifier for the request.
* `status_url` (string): URL to poll for request progress.
* `result_url` (string): URL to fetch outputs once the request completes.
* `cancel_url` (string): URL to cancel the request if still queued.

***

## Monitor Request Status

Poll the current state for a `request_id`. Typical states are: `in_queue` → `in_progress` → `completed` (or `cancelled`).

```
GET /v1/requests/{request_id}/status
```

### Request Example

```bash  theme={null}
curl --request GET \
  --url https://model-api.runcomfy.net/v1/requests/{request_id}/status \
  --header "Authorization: Bearer <token>"
```

### Response Example

```json  theme={null}
{
  "request_id": "{request_id}",
  "status": "in_queue",
  "queue_position": 3,
  "status_url": "https://model-api.runcomfy.net/v1/requests/{request_id}/status",
  "result_url": "https://model-api.runcomfy.net/v1/requests/{request_id}/result"
}
```

Successful requests return a 200 OK status with a JSON object describing the request’s state.

* `status` (string): States while polling: `in_queue`, `in_progress`, `completed`, `cancelled`.
* `status_url` (string): URL to poll for request progress.
* `result_url` (string): URL to fetch outputs once the request completes.
* For `in_queue`, `queue_position` (integer): Your position in the queue.

***

## Retrieve Request Results

When `status` is `completed`, fetch the final outputs. The shape of result (single URI vs. object/array) is defined by the model’s Output schema on its API page in the Playground.

```
GET /v1/requests/{request_id}/result
```

### Request Example

```bash  theme={null}
curl --request GET \
  --url https://model-api.runcomfy.net/v1/requests/{request_id}/result \
  --header "Authorization: Bearer <token>"
```

### Response Example

```json  theme={null}
{
  "request_id": "{request_id}",
  "status": "succeeded",
  "output": {
    "image": "https://playgrounds-storage-public.runcomfy.net/a.png",
    "videos": [
      "https://playgrounds-storage-public.runcomfy.net/a.mp4",
      "https://playgrounds-storage-public.runcomfy.net/b.mp4",
      "https://playgrounds-storage-public.runcomfy.net/c.mp4"
    ]
  }
}

```

Successful requests return **200 OK** with a JSON object containing the request’s final details.

* `status` (string): One of `succeeded`, `failed`, `in_queue`, `in_progress`, or `cancelled`.
* `output` (object, present only when `status` is `succeeded`): a single URL string (one file) or an array of URL strings (multiple files).
* `created_at` (string): When the request was created.
* `finished_at` (string): When the request completed.

***

## Cancel a Request

Cancel a request that is still queued. Already completed or terminated requests will be no‑ops.

```
POST /v1/requests/{request_id}/cancel
```

### Request Example

```bash  theme={null}
curl --request POST \
  --url https://model-api.runcomfy.net/v1/requests/{request_id}/cancel \
  --header "Authorization: Bearer <token>"
```

### Response Example

```json  theme={null}
{
  "request_id": "{request_id}",
  "status": "completed"
  "outcome": "cancelled"
}
```

Successful requests return a 202 Accepted status with a JSON object containing the cancellation outcome.

* `outcome` (string): `cancelled` if the cancellation is accepted; `not_cancellable` if the request is already in progress or completed.

***

## Image/Video/Audio Inputs

Use **a publicly accessible HTTPS URL** that returns the file with an unauthenticated GET request (no cookies or auth headers). Prefer stable or pre‑signed URLs for private assets.

```json  theme={null}
{
  "image_url": "https://playgrounds-storage-public.runcomfy.net/tools/7063/media-files/usecase1-1-input.webp"
}
```


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.runcomfy.com/llms.txt


# Error Codes

### 400001 InvalidResourceIdentifier

The request contains an invalid or malformed resource ID (for example, a wrong `model_id`). Use the exact identifier as shown on the model’s detail page in the Playground.

<img src="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6f5362e4a114134355af90d24e1ecca8" alt="Alt RunComfy model id" data-og-width="1466" width="1466" data-og-height="673" height="673" data-path="docs-image/playground-model-id.webp" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=280&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=89c805a47db44bae61d01dc8f6172ed9 280w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=560&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8aea0daf37d3ed483720407bc8e2dadc 560w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=840&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6d74342e953b62393e22711ec2e9b04a 840w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1100&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=6dbfa81c43d7d9aa38167dc41e430d32 1100w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=1650&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=8792e1229ff88be0005a5465cf4c4538 1650w, https://mintcdn.com/inceptionsaiinc/1rLD4y3Ze0dSW9uc/docs-image/playground-model-id.webp?w=2500&fit=max&auto=format&n=1rLD4y3Ze0dSW9uc&q=85&s=dcb77838048a3d129eab0a468afd1aca 2500w" />

### 403001 PermissionDeniedError

The resource exists but is not accessible to the authenticated user (e.g., the `request_id` belongs to another user). Use the owner’s credentials or obtain access, then retry.

### 404001 ResourceNotFound

The specified resource cannot be found (e.g., a nonexistent, deleted, or expired `request_id`). Confirm the identifier and that it belongs to your account before retrying.

### 400002 InsufficientResources

Your account has no remaining balance to run this operation.

### 400004 UserAccountError

Authentication or account state is invalid, missing/expired token, revoked credentials, or an inactive account. Send a valid `Authorization: Bearer <token>` and ensure the account is active.


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.runcomfy.com/llms.txt