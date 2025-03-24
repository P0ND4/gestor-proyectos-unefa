# Identificar entidades, atributos y claves primarias

* `Role(id(PK), name, permissions)`
* `User(id(PK), names, surnames, email, phone, region, career)`
* `Project(id(PK), title, career, ...)`

# Establecer la cardinalidad

En general un rol puede agrupar muchos usuarios, pero un usuario sólo puede poseer un rol. Entonces:

~~~
+------+------+
| User | Role |
+------+------+
|  1   |   1  |
|      |      |
|  N   |   1  |
+------+------+
|  N   |   1  |
+------+------+
~~~

Un usuario puede pertenecer a varios proyectos, y en un proyecto pueden estar varios usuarios (sólo uno de ellos puede ser el líder del proyecto, así como sólo uno puede ser el tutor). Entonces:

~~~
+------+---------+
| User | Project |
+------+---------+
|  1   |    M    |
|      |         |
|  N   |    1    |
+------+---------+
|  N   |    M    |
+------+---------+
~~~

# Diagrama entidad relación

~~~
+-------+                        +----+
| User  |----N----(Has)----1---->|Role|
+---+---+                        +----+
    |
    N
    |
    |
(Participates)
    |
    |
    M
    |
+---------+
| Project |
+---------+
~~~

# Identificar entidades adicionales y claves foráneas

* `Role(id(PK), name, permissions)`
* `User(id(PK), names, surnames, email, phone, region, career, role_id(FK))`
* `Project(id(PK), title, career, ..., leader_id(FK), tutor_id(FK))`
* `ProjectUser(project_id(FK), user_id(FK))`
