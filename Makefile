NAME?="ui"

VCS_SHA?=$(shell git rev-parse --verify HEAD)
BUILD_DATE?=$(shell git show -s --date=iso8601-strict --pretty=format:%cd $$VCS_SHA)
VCS_BRANCH?=$(shell git branch | grep \* | cut -f2 -d' ')
TAG=$(shell echo $$(git rev-list --count HEAD)$$(git show -s --format=.%ad.%h --date=format:%Y-%m-%d))
RELEASE_ENV=master

RELEASE_VERSION?=$(shell git describe --always --tags --dirty | sed 's/^v//')

RELEASE_NAME?=$(NAME)

all:

docker:
	docker build -t arigato/$(NAME) \
		--label "org.label-schema.build-date"="$(BUILD_DATE)" \
		--label "org.label-schema.name"="$(RELEASE_NAME)" \
		--label "org.label-schema.vcs-ref"="$(VCS_SHA)" \
		--label "org.label-schema.vendor"="Arigato Machine Inc." \
		--label "org.label-schema.version"="$(TAG)" \
		--label "org.vcs-branch"="$(VCS_BRANCH)" \
		.

package:
	@echo 🧹 Creating clean workspace…
	rm -rf pkg
	mkdir pkg

	@echo 📦 Building package…
	npm run build
	cp -r dist pkg/.
	cp LICENSE pkg/.
	cp README.md pkg/.
	cp package.json pkg/.
	npm run clean-package-json

release-pr: docker
	docker tag arigato/$(NAME) arigato/$(NAME):$(RELEASE_VERSION)
	docker push arigato/$(NAME):$(RELEASE_VERSION)

release-master: docker
	docker tag arigato/$(NAME) arigato/$(NAME):$(TAG)
	docker push arigato/$(NAME):latest
	docker push arigato/$(NAME):$(TAG)

release: release-$(RELEASE_ENV)

docker-login:
	docker login -u="$$DOCKER_USERNAME" -p="$$DOCKER_PASSWORD"
