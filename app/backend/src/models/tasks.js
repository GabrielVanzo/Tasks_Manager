module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    task: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'tasks',
    underscored: true,
    timestamps: true
  });
  return Tasks;
};