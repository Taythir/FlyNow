import yaml


class Config:
    def __init__(self, config_path=None):

        if config_path is None:
            config_path = './src/config.yaml'

        self.config_path = config_path
        self.config = self._load_yaml()

    def _load_yaml(self):
        with open(self.config_path, "r") as file:
            try:
                config = yaml.safe_load(file)
                return config
            except yaml.YAMLError as e:
                print(f"Error loading YAML file: {e}")
                return {}

    def _get_db(self):
        return self.config.get("db")

    def get_db_ip(self):
        return self.config.get("db").get("ip")

    def get_db_port(self):
        return self.config.get("db").get("port")

    def get_db_id(self):
        return self.config.get("db").get("id")

    def get_db_password(self):
        return self.config.get("db").get("password")

    def get_db_name(self):
        return self.config.get("db").get("db-name")


if __name__ == '__main__':
    config = Config()

    print(config.get_db_ip())


